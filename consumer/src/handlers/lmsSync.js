const axios = require('axios');
const logger = require('../modules/logger');
const db = require('../modules/db');

const LMS_BASE = 'https://learning.hanyang.ac.kr';

function createLmsClient(cookieHeader) {
  return axios.create({
    headers: {
      Cookie: cookieHeader,
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    transformResponse: [(data) => {
      if (typeof data === 'string') {
        try { return JSON.parse(data.replace(/^while\(1\);/, '')); } catch (_) { return data; }
      }
      return data;
    }],
  });
}

async function handle(message) {
  const { session, user, cookies } = message.payload;
  logger.info(`[LMS_SYNC] 처리 시작 | user: ${JSON.stringify(user)} | messageId: ${message.messageId}`);

  if (!user || !user.UserNo) {
    throw new Error('User information is missing in message payload');
  }

  // 처리 시작 상태 기록 (Realtime → Extension에 push됨)
  await db.query({ SP_NAME: 'USER_SYNC_STATUS_SET', p_UserNo: user.UserNo, p_SyncStatus: 2 });

  try {
    const cookieHeader = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
    const client = createLmsClient(cookieHeader);

    // 수강 과목 목록 조회
    const dashRes = await client.get(`${LMS_BASE}/api/v1/dashboard/dashboard_cards`);
    const courses = dashRes.data;
    if (!Array.isArray(courses)) throw new Error('과목 목록 조회 실패');

    // 과목 리스트를 JSON 형식으로 변환
    const subjectsList = courses.map(course => {
      const courseId = course.id;
      const courseName = course.courseName || course.originalName || course.course_code;
      // 과목 코드와 과목명 추출
      // 예: "202610HY12266_소프트웨어공학" → SubjectCode: "202610HY12266", SubjectName: "소프트웨어공학"
      // 또는 course_code가 이미 분리되어 있을 수 있음
      const parts = courseName.split('_');
      const subjectCode = course.course_code || (parts.length > 1 ? parts[0] : courseName);
      const subjectName = parts.length > 1 ? parts.slice(1).join('_') : courseName;

      return {
        SubjectCode: subjectCode,
        SubjectName: subjectName,
      };
    });

    logger.info(`[LMS_SYNC] 수강 과목 ${subjectsList.length}개 조회 완료 | ${subjectsList.map(s => `${s.SubjectCode}_${s.SubjectName}`).join(', ')}`);

    // 각 과목의 과제 + 제출 현황 + LearningX 모듈 병렬 조회
    const courseDetails = await Promise.all(courses.map(async (course) => {
      const courseId = course.id;
      const courseName = course.courseName || course.originalName || course.course_code;

      try {
        const [assignRes, subRes] = await Promise.all([
          client.get(`${LMS_BASE}/api/v1/courses/${courseId}/assignment_groups?include[]=assignments&override_assignment_dates=true`),
          client.get(`${LMS_BASE}/api/v1/courses/${courseId}/students/submissions?per_page=50`),
        ]);

        const submissionMap = {};
        if (Array.isArray(subRes.data)) {
          subRes.data.forEach(s => { submissionMap[s.assignment_id] = s.workflow_state; });
        }

        let modules = [];
        if (cookies['xn_api_token']) {
          try {
            const modRes = await axios.get(
              `${LMS_BASE}/learningx/api/v1/courses/${courseId}/modules?include_detail=true`,
              {
                headers: {
                  Authorization: `Bearer ${cookies['xn_api_token']}`,
                  Accept: 'application/json',
                  Cookie: cookieHeader,
                },
              }
            );
            modules = modRes.data;
          } catch (_) {}
        }

        return { id: courseId, name: courseName, assignments: assignRes.data, submissionMap, modules };
      } catch (e) {
        return { id: courseId, name: courseName, error: e.message };
      }
    }));

    // DB에 과목 정보 저장
    const result = await db.query({
      SP_NAME: 'SUBJECT_SYNC',
      TABLE: false,
      p_UserNo: user.UserNo,
      p_SubjectsJson: JSON.stringify(subjectsList),
    });
    logger.info(`[LMS_SYNC] DB 저장 완료 | result: ${JSON.stringify(result)}`);

    // 완료 상태 기록 (Realtime → Extension에 push됨)
    await db.query({ SP_NAME: 'USER_SYNC_STATUS_SET', p_UserNo: user.UserNo, p_SyncStatus: 3 });
    logger.info(`[LMS_SYNC] 처리 완료 | messageId: ${message.messageId} | 과목 수: ${courseDetails.length}`);

    return courseDetails;
  } catch (err) {
    // 실패 상태 기록 (Realtime → Extension에 push됨)
    await db.query({ SP_NAME: 'USER_SYNC_STATUS_SET', p_UserNo: user.UserNo, p_SyncStatus: 4 }).catch(() => {});
    logger.error(`[LMS_SYNC] 처리 실패 | messageId: ${message.messageId} | ${err.message}`);
    throw err;
  }
}

module.exports = { handle };
