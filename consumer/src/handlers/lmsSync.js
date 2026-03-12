const axios = require('axios');
const logger = require('../modules/logger');

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
  const { session, cookies } = message.payload;
  logger.info(`[LMS_SYNC] 처리 시작 | session: ${session} | messageId: ${message.messageId}`);

  const cookieHeader = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
  const client = createLmsClient(cookieHeader);

  // 수강 과목 목록 조회
  const dashRes = await client.get(`${LMS_BASE}/api/v1/dashboard/dashboard_cards`);
  const courses = dashRes.data;
  if (!Array.isArray(courses)) throw new Error('과목 목록 조회 실패');

  logger.info(`[LMS_SYNC] 수강 과목 ${courses.length}개 조회 완료 | ${courses.map(c => c.courseName || c.originalName || c.course_code).join(', ')}`);

  const apiToken = cookies['xn_api_token'];

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
      if (apiToken) {
        try {
          const modRes = await axios.get(
            `${LMS_BASE}/learningx/api/v1/courses/${courseId}/modules?include_detail=true`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
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

  logger.info(`[LMS_SYNC] 처리 완료 | messageId: ${message.messageId} | 과목 수: ${courseDetails.length}`);

  // TODO: DB 저장 로직 추가 예정
  return courseDetails;
}

module.exports = { handle };
