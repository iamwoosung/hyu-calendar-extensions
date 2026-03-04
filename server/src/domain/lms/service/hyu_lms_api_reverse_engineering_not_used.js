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

    // 과목 리스트 조회
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

            // 주차 학습 조회 (비디오 시청 상태 포함)
            if (apiToken) {
                try {
                    const modulesRes = await client.get(`https://learning.hanyang.ac.kr/learningx/api/v1/courses/${courseId}/modules?include_detail=true`, {
                        headers: { 'Authorization': `Bearer ${apiToken}`, 'Accept': 'application/json' }
                    });

                    if (Array.isArray(modulesRes.data)) {
                        modulesRes.data.filter(m => m.module_items && m.module_items.length > 0).forEach(module => {
                            module.module_items.forEach(item => {
                                const c = item.content_data || {};
                                const watched = item.completed || item.attendance_status === 'completed' || item.attendance_status === 'attended' ? '✅ 시청완료' : '❌ 미시청';

                                let durationLabel = '';
                                if (c.item_content_data?.duration) {
                                    const d = c.item_content_data.duration;
                                    durationLabel = ` [영상: ${Math.floor(d / 60)}분 ${Math.round(d % 60)}초]`;
                                }

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

            // 과제 및 평가 조회 (제출 상태 포함)
            try {
                const subRes = await client.get(`https://learning.hanyang.ac.kr/api/v1/courses/${courseId}/students/submissions?per_page=50`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const submissionMap = {};
                if (Array.isArray(subRes.data)) {
                    subRes.data.forEach(s => { submissionMap[s.assignment_id] = s.workflow_state; });
                }

                const assignmentsRes = await client.get(`https://learning.hanyang.ac.kr/api/v1/courses/${courseId}/assignment_groups?include[]=assignments&override_assignment_dates=true`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                if (Array.isArray(assignmentsRes.data)) {
                    const activeGroups = assignmentsRes.data.filter(g => g.assignments && g.assignments.length > 0);
                    if (activeGroups.length > 0) {
                        activeGroups.forEach(group => {
                            group.assignments.forEach(assign => {
                                const statusRaw = submissionMap[assign.id] || 'unsubmitted';
                                const submitted = (statusRaw === 'submitted' || statusRaw === 'graded') ? '✅ 제출완료' : '❌ 미제출';

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
