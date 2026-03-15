const SERVER_URL = 'http://localhost:3000';

// ─── Side Panel: 아이콘 클릭 시 사이드 패널 열기 ──────────────────────────────
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ─── LMS 로그인 상태 확인 (ref/background.js 방식: 실제 API 호출 → 401 여부 판단) ───

async function checkLmsLogin() {
  // 현재 쿠키 이름 진단용 로그
  const cookies = await chrome.cookies.getAll({ domain: 'learning.hanyang.ac.kr' });
  console.log('[LMS 쿠키 목록]', cookies.map(c => c.name));

  // API 응답으로 로그인 여부 판단 (401이면 미로그인)
  try {
    const res = await fetch('https://learning.hanyang.ac.kr/api/v1/dashboard/dashboard_cards', {
      credentials: 'include',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    console.log('[LMS 로그인 확인] status:', res.status);
    return res.status !== 401;
  } catch (e) {
    console.error('[LMS 로그인 확인 실패]', e.message);
    return false;
  }
}

async function getLmsCookies() {
  return chrome.cookies.getAll({ domain: 'learning.hanyang.ac.kr' });
}

// ─── 메시지 핸들러 ────────────────────────────────────────────────────────────

// ─── LMS 로그인 완료 감지 → 자동 동기화 ─────────────────────────────────────

chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;
  if (!tab.url || !tab.url.startsWith('https://learning.hanyang.ac.kr')) return;
  if (tab.url.includes('/login')) return; // 아직 로그인 페이지

  console.log('[탭 감지] URL:', tab.url);

  const { pendingLmsSync, pendingLmsSession } = await chrome.storage.local.get([
    'pendingLmsSync',
    'pendingLmsSession',
  ]);
  console.log('[동기화 대기 여부]', pendingLmsSync, '| 세션:', pendingLmsSession);
  if (!pendingLmsSync) return;

  const loggedIn = await checkLmsLogin();
  if (!loggedIn) return;

  await chrome.storage.local.remove(['pendingLmsSync', 'pendingLmsSession']);

  try {
    const cookies = await getLmsCookies();
    const cookieMap = Object.fromEntries(cookies.map(c => [c.name, c.value]));
    const res = await fetch(`${SERVER_URL}/api/lms/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session: pendingLmsSession, cookies: cookieMap }),
    });
    if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

    chrome.runtime.sendMessage({ action: 'AUTO_SYNC_STARTED' }).catch(() => {});
    chrome.action.setBadgeText({ text: '✓' });
    chrome.action.setBadgeBackgroundColor({ color: '#22c55e' });
    setTimeout(() => chrome.action.setBadgeText({ text: '' }), 5000);
  } catch (e) {
    console.error('[자동 동기화 실패]', e.message);
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
    setTimeout(() => chrome.action.setBadgeText({ text: '' }), 5000);
  }
});

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
