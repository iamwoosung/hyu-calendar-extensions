const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const NodeRSA = require('node-rsa');

const USER_ID = '';
const USER_PW = '';

const jar = new CookieJar();
const client = wrapper(axios.create({
    jar,
    withCredentials: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    }
}));

function getRSAEnc(data, modulusHex) {
    const base64Str = Buffer.from(data).toString('base64');
    const key = new NodeRSA();
    key.importKey({ n: Buffer.from(modulusHex, 'hex'), e: 65537 }, 'components-public');
    key.setOptions({ encryptionScheme: 'pkcs1' });

    let encryptedFinal = "";
    const chunkSize = 50;
    for (let i = 0; i < base64Str.length; i += chunkSize) {
        const chunk = base64Str.substring(i, i + chunkSize);
        encryptedFinal += key.encrypt(chunk, 'hex');
    }
    return encryptedFinal;
}

async function runTask() {
    // LMS 세션 초기화
    await client.get('https://hy-mooc.hanyang.ac.kr/lms');

    // RSA 공개키 취득
    const tokenRes = await client.get('https://api.hanyang.ac.kr/oauth/public_token.json?t=mobile');
    const [keyName, publicKeyHex] = tokenRes.data.replace(/"/g, '').split('|');

    const encId = getRSAEnc(USER_ID, publicKeyHex);
    const encPw = getRSAEnc(USER_PW, publicKeyHex);

    const loginPayload = new URLSearchParams({
        '_userId': encId,
        '_password': encPw,
        'identck': keyName
    });
    await client.post('https://api.hanyang.ac.kr/oauth/login_submit.json', loginPayload.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': 'https://api.hanyang.ac.kr/oauth/login'
        }
    });

    // OAuth URL 취득
    const ssoTriggerRes = await client.get('https://hy-mooc.hanyang.ac.kr/login?type=sso', {
        maxRedirects: 0,
        validateStatus: s => s === 302
    });
    const gwUrl = new URL(ssoTriggerRes.headers.location, 'https://hy-mooc.hanyang.ac.kr').href;

    // 클라이언트 ID 취득
    const gwRes = await client.get(gwUrl, { maxRedirects: 0, validateStatus: s => s === 302 });
    const authUrl = gwRes.headers.location;
    const authRes = await client.get(authUrl, { maxRedirects: 0, validateStatus: (status) => status >= 200 && status < 400 });

    // Access Token 취득
    const redirectUrl = authRes.headers.location;
    if (redirectUrl.includes('/oauth/null')) return 'RETRY';
    const accessToken = redirectUrl.match(/access_token=([^&]+)/)[1];

    // SSO Callback
    const redirectUri = new URL(authUrl).searchParams.get('redirect_uri');
    const ssoRes = await client.get(`${redirectUri}?atok=${accessToken}`, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
    });
    const callbackUrl = ssoRes.headers.location.startsWith('http') ? ssoRes.headers.location : `https://hy-mooc.hanyang.ac.kr${ssoRes.headers.location}`;
    const resultToken = new URL(callbackUrl).searchParams.get('result');
    await client.get(callbackUrl);

    // Canvas 세션 브릿지
    const fromCcUrl = `https://learning.hanyang.ac.kr/learningx/login/from_cc?result=${encodeURIComponent(resultToken)}`;
    const fromCcRes = await client.get(fromCcUrl);
    const html = fromCcRes.data;

    // RSA 복호화
    const privateKeyMatch = html.match(/-----BEGIN RSA PRIVATE KEY-----[\s\S]*?-----END RSA PRIVATE KEY-----/);
    const encryptedDataMatch = html.match(/window\.loginCryption\("([^"]+)"/);
    if (!privateKeyMatch || !encryptedDataMatch) throw new Error('Decryption keys not found');
    const decryptor = new NodeRSA(privateKeyMatch[0]);
    decryptor.setOptions({ encryptionScheme: 'pkcs1' });
    const decryptedPassword = decryptor.decrypt(encryptedDataMatch[1], 'utf8');

    const extract = (name) => {
        const reg = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, 'i');
        const m = html.match(reg);
        return m ? m[1] : '';
    };

    // Canvas 로그인
    const canvasParams = new URLSearchParams();
    canvasParams.set('utf8', '✓');
    canvasParams.set('redirect_to_ssl', '1');
    canvasParams.set('after_login_url', '');
    canvasParams.set('pseudonym_session[unique_id]', extract('pseudonym_session\\[unique_id\\]') || USER_ID);
    canvasParams.set('pseudonym_session[password]', decryptedPassword);
    canvasParams.set('pseudonym_session[remember_me]', '0');

    await client.post('https://learning.hanyang.ac.kr/login/canvas', canvasParams.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': fromCcUrl }
    });

    // 1. 사용자 정보(User Profile) 조회
    try {
        const profileRes = await client.get('https://learning.hanyang.ac.kr/api/v1/users/self/profile', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const studentId = profileRes.data.login_id; // 학번
        const rawName = profileRes.data.name;       // "조우성 / Jo, Woosung(...)" 형태
        const koName = rawName.split('/')[0].trim(); // 순수 한글 이름 추출
        const email = profileRes.data.primary_email; // 이메일 추출

        console.log(`\n============================================================`);
        console.log(`👤 로그인 성공: ${koName} 님 (학번: ${studentId})`);
        console.log(`📧 이메일: ${email}`);
        console.log(`============================================================`);
    } catch (e) {
        console.log(`  ⚠️ 사용자 정보 조회 실패: ${e.message}`);
    }

    // 2. 과목 리스트 조회
    const apiRes = await client.get('https://learning.hanyang.ac.kr/api/v1/dashboard/dashboard_cards', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });


    if (Array.isArray(apiRes.data) && apiRes.data.length > 0) {
        console.log('\n✅ 총', apiRes.data.length, '개의 과목을 발견했습니다.');

        // LearningX API 호출을 위한 토큰 확보 (한 번만 수행)
        const cookies = await jar.getCookies('https://learning.hanyang.ac.kr');
        const apiToken = cookies.find(c => c.key === 'xn_api_token')?.value;

        for (const course of apiRes.data) {
            const courseName = course.courseName || course.originalName || course.course_name || '알 수 없는 과목';
            const courseId = course.id;

            console.log('\n' + '='.repeat(60));
            console.log(`� 과목: ${courseName} (ID: ${courseId})`);
            console.log('='.repeat(60));

            // [1. 주차 학습(동영상 등) 기록 조회 영역]
            // LearningX API 토큰이 존재할 경우, 해당 과목의 모든 모듈(주차별 학습)의 세부 정보를 가져옵니다.
            if (apiToken) {
                try {
                    // 과목 모듈 API 호출: 각 주차별 학습 항목 리스트를 가져옴
                    const modulesRes = await client.get(`https://learning.hanyang.ac.kr/learningx/api/v1/courses/${courseId}/modules?include_detail=true`, {
                        headers: { 'Authorization': `Bearer ${apiToken}`, 'Accept': 'application/json' }
                    });

                    // 모듈 응답 데이터 통과 확인 및 파싱
                    if (Array.isArray(modulesRes.data)) {
                        // 내용이 있는 모듈(module_items가 있는 모듈)만 필터링하여 순회
                        modulesRes.data.filter(m => m.module_items && m.module_items.length > 0).forEach(module => {
                            // 모듈 내의 각 학습 항목(item) 순회
                            module.module_items.forEach(item => {
                                const c = item.content_data || {};

                                // 출석 및 진행 완료 여부를 확인하여 시청 여부 판별
                                // attendance_status가 'completed'이거나 'attended'인 경우, 또는 item.completed가 true일 때 시청 완료로 간주
                                const watched = item.completed || item.attendance_status === 'completed' || item.attendance_status === 'attended' ? '✅ 시청완료' : '❌ 미시청';

                                // 동영상 콘텐츠인 경우 영상 길이를 포맷팅하여 라벨링
                                let durationLabel = '';
                                if (c.item_content_data?.duration) {
                                    const d = c.item_content_data.duration;
                                    durationLabel = ` [영상: ${Math.floor(d / 60)}분 ${Math.round(d % 60)}초]`;
                                }

                                // 학습 가능 시작일시(unlock_at)와 마감일시(due_at) 변환
                                const openDate = c.unlock_at ? new Date(c.unlock_at).toLocaleString('ko-KR') : '즉시';
                                const dueDate = c.due_at ? new Date(c.due_at).toLocaleString('ko-KR') : '기한없음';

                                console.log(`     - [${watched}] ${item.title}${durationLabel}`);
                                console.log(`       (학습기간: ${openDate} ~ ${dueDate})`);
                            });
                        });
                    }
                } catch (e) {
                    console.log(`  ⚠️ 주차 학습 조회 실패: ${e.message}`);
                }
            }

            // [2. 과제 및 평가 제출 기록 조회 영역]
            try {
                // (1) 현재 사용자가 해당 과목에 제출한 모든 과제 제출 상태(submissions) 정보를 조회
                const subRes = await client.get(`https://learning.hanyang.ac.kr/api/v1/courses/${courseId}/students/submissions?per_page=50`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                // 과제 ID를 키로 하여 제출 상태(workflow_state)를 매핑해 두는 객체 생성
                const submissionMap = {};
                if (Array.isArray(subRes.data)) {
                    subRes.data.forEach(s => { submissionMap[s.assignment_id] = s.workflow_state; });
                }

                // (2) 해당 과목의 모든 과제 그룹과 세부 과제 정보(assignments) 목록을 조회
                const assignmentsRes = await client.get(`https://learning.hanyang.ac.kr/api/v1/courses/${courseId}/assignment_groups?include[]=assignments&override_assignment_dates=true`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                if (Array.isArray(assignmentsRes.data)) {
                    // 과제가 포함되어 있는 그룹만 필터링
                    const activeGroups = assignmentsRes.data.filter(g => g.assignments && g.assignments.length > 0);

                    if (activeGroups.length > 0) {
                        activeGroups.forEach(group => {
                            // 각 그룹에 속한 과제 목록 순회
                            group.assignments.forEach(assign => {
                                // 앞서 만든 submissionMap에서 현재 과제의 ID에 해당하는 제출 상태 조회
                                // 없으면 'unsubmitted(미제출)' 처리
                                const statusRaw = submissionMap[assign.id] || 'unsubmitted';

                                // 제출상태가 'submitted(제출됨)' 또는 'graded(채점됨)'인 경우 완료로 표시
                                const submitted = (statusRaw === 'submitted' || statusRaw === 'graded') ? '✅ 제출완료' : '❌ 미제출';

                                // 과제 오픈 날짜와 마감 날짜 변환
                                const openDate = assign.unlock_at ? new Date(assign.unlock_at).toLocaleString('ko-KR') : '즉시';
                                const dueAt = assign.due_at ? new Date(assign.due_at).toLocaleString('ko-KR') : '기한 없음';

                                console.log(`     - [${submitted}] ${assign.name}`);
                                console.log(`       (제출기간: ${openDate} ~ ${dueAt})`);
                            });
                        });
                    }
                }
            } catch (e) {
                console.log(`  ⚠️ 과제 조회 실패: ${e.message}`);
            }
        }

        return 'SUCCESS';
    }

    return 'FAILED';
}

async function run() {
    let count = 0;
    while (count < 3) {
        const res = await runTask().catch(e => { console.log(`Error: ${e.message}`); return 'ERROR'; });
        if (res === 'SUCCESS') break;
        if (res === 'RETRY' || res === 'ERROR') {
            console.log('\n세션이 무효화되었습니다. 처음부터 다시 시도합니다');
            count++;
            jar.removeAllCookiesSync();
            continue;
        }
        break;
    }
}

run();
