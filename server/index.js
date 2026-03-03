require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결 풀
const db = new Pool({
  host:     process.env.DB_HOST, 
  port:     process.env.DB_PORT, 
  database: process.env.DB_NAME, 
  user:     process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
});

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || `http://localhost:${PORT}/auth/kakao/callback`;

// 인메모리 세션 저장소 (프로덕션에서는 Redis/DB 사용)
const sessions = new Map();

app.use(cors({ origin: '*' }));
app.use(express.json());
// ─── 카카오 OAuth ─────────────────────────────────────────────────────────────

/**
 * Step 1: 카카오 로그인 페이지로 리다이렉트
 * GET /auth/kakao
 */
app.get('/auth/kakao', (req, res) => {
  if (!KAKAO_CLIENT_ID) {
    return res.status(500).send('KAKAO_CLIENT_ID 환경변수가 설정되지 않았습니다.');
  }

  // 익스텐션이 전달한 chromiumapp.org 리다이렉트 URL을 state에 담아 전달
  const finalRedirect = req.query.final_redirect || '';

  const kakaoAuthUrl =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=profile_nickname` +
    `&state=${encodeURIComponent(finalRedirect)}`;

  res.redirect(kakaoAuthUrl);
});

/**
 * Step 2: 카카오 콜백 처리 - 코드 → 토큰 → 유저 정보
 * GET /auth/kakao/callback
 */
app.get('/auth/kakao/callback', async (req, res) => {
  const { code, state } = req.query;
  const finalRedirect = state ? decodeURIComponent(state) : '';

  if (!code) {
    return res.status(400).send('Authorization code가 없습니다.');
  }

  try {
    // 액세스 토큰 발급
    const tokenRes = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
        ...(KAKAO_CLIENT_SECRET && { client_secret: KAKAO_CLIENT_SECRET }),
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenRes.data;

    // 유저 정보 조회
    const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const kakaoAccount = userRes.data.kakao_account ?? {};
    const profile = kakaoAccount.profile ?? {};

    const user = {
      id: String(userRes.data.id),
      nickname: profile.nickname ?? null,
      profile_image: profile.profile_image_url ?? null,
      email: kakaoAccount.email ?? null,
    };

    // 세션 생성 (5분 후 자동 만료)
    const sessionId = uuidv4();
    sessions.set(sessionId, user);
    setTimeout(() => sessions.delete(sessionId), 5 * 60 * 1000);

    // 신규 유저는 INSERT, 기존 유저는 닉네임 UPDATE
    await db.query(
      `INSERT INTO "USER" (kakao_id, kakao_nickname)
       VALUES ($1, $2)
       ON CONFLICT (kakao_id) DO UPDATE
         SET kakao_nickname = EXCLUDED.kakao_nickname,
             updated_at     = NOW()`,
      [user.id, user.nickname]
    );

    console.log(`[LOGIN] ${user.nickname} (id: ${user.id})`);

    // launchWebAuthFlow 방식: chromiumapp.org URL로 리다이렉트 (팝업 유지)
    // 일반 브라우저 접근 시 fallback으로 /auth/success 사용
    const destination = finalRedirect
      ? `${finalRedirect}?session=${sessionId}`
      : `/auth/success?session=${sessionId}`;

    res.redirect(destination);
  } catch (err) {
    console.error('[Kakao OAuth Error]', err.response?.data ?? err.message);
    res.status(500).send('카카오 인증 중 오류가 발생했습니다.');
  }
});

/**
 * 로그인 성공 페이지 (익스텐션이 이 URL을 감지해 탭을 닫음)
 * GET /auth/success
 */
app.get('/auth/success', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>로그인 성공</title>
  <style>
    body { display:flex; justify-content:center; align-items:center; height:100vh;
           font-family:sans-serif; background:#fffde7; margin:0; }
    .box { text-align:center; }
    .icon { font-size:48px; }
    h2 { margin:12px 0 8px; color:#333; }
    p  { color:#888; font-size:14px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">✅</div>
    <h2>카카오 로그인 성공!</h2>
    <p>익스텐션이 이 창을 자동으로 닫습니다.</p>
  </div>
</body>
</html>`);
});

// ─── API ──────────────────────────────────────────────────────────────────────

/**
 * 세션으로 유저 정보 반환
 * GET /api/me?session=<sessionId>
 */
app.get('/api/me', (req, res) => {
  const { session } = req.query;

  if (!session || !sessions.has(session)) {
    return res.status(401).json({ error: '유효하지 않거나 만료된 세션입니다.' });
  }

  res.json({ user: sessions.get(session) });
});

/**
 * 로그아웃 - 세션 삭제
 * POST /api/logout?session=<sessionId>
 */
app.post('/api/logout', (req, res) => {
  const { session } = req.query;
  if (session) sessions.delete(session);
  res.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`카카오 콜백 URI: ${KAKAO_REDIRECT_URI}`);
});
