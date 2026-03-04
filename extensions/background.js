const SERVER_URL = 'http://localhost:3000';

// ─── LMS 로그인 상태 확인 (ref/background.js 방식: 실제 API 호출 → 401 여부 판단) ───

async function checkLmsLogin() {
  // 브라우저 세션 쿠키가 자동 포함됨 (host_permissions 덕분)
  const res = await fetch('https://learning.hanyang.ac.kr/api/v1/dashboard/dashboard_cards', {
    credentials: 'include',  // 브라우저 세션 쿠키 포함 (MV3 서비스워커 필수)
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
  if (res.status === 401) return false;
  return true;
}

async function getLmsCookies() {
  return chrome.cookies.getAll({ domain: 'learning.hanyang.ac.kr' });
}

// ─── 메시지 핸들러 ────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {

  if (request.action === 'SYNC_LMS') {
    const trySend = (msg) => { try { sendResponse(msg); } catch (_) {} };

    (async () => {
      try {
        // 로그인 여부 확인 (401 → 미로그인)
        const loggedIn = await checkLmsLogin();
        if (!loggedIn) {
          trySend({ success: false, error: 'LMS_LOGIN_REQUIRED' });
          return;
        }

        // 쿠키를 서버에 전달 (서버가 LMS API 호출에 사용)
        const cookies = await getLmsCookies();
        const cookieMap = Object.fromEntries(cookies.map(c => [c.name, c.value]));

        const res = await fetch(`${SERVER_URL}/api/lms/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session: request.session, cookies: cookieMap }),
        });

        if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

        trySend({ success: true });
      } catch (error) {
        trySend({ success: false, error: error.message });
      }
    })();
    return true; // 비동기 응답 유지
  }

});
