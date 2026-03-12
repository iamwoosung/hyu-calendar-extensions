const oauthService = require('../service/oauthService');
const session = require('../../../global/modules/session');
const logger = require('../../../global/modules/logger');

const PORT = process.env.PORT || 3000;
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || `http://localhost:${PORT}/auth/kakao/callback`;

async function redirectToKakao(req, res) {
  if (!KAKAO_CLIENT_ID) {
    return res.status(500).send('KAKAO_CLIENT_ID 환경변수가 설정되지 않았습니다.');
  }

  const finalRedirect = req.query.final_redirect || '';

  const kakaoAuthUrl =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=profile_nickname` +
    `&state=${encodeURIComponent(finalRedirect)}`;

  res.redirect(kakaoAuthUrl);
}

async function handleCallback(req, res) {
  const { code, state } = req.query;
  const finalRedirect = state ? decodeURIComponent(state) : '';

  if (!code) {
    return res.status(400).send('Authorization code가 없습니다.');
  }

  try {
    const user = await oauthService.kakaoLogin(code);
    const sessionId = session.create(user);

    logger.info(`[LOGIN] ${user.nickname} (id: ${user.id}) | isNew: ${user.isNew} | needsLmsSync: ${user.needsLmsSync}`);

    const status = user.needsLmsSync ? 'needs_sync' : 'ok';

    if (finalRedirect) {
      res.redirect(`${finalRedirect}?session=${sessionId}&status=${status}`);
    } else {
      res.json({ session: sessionId, status });
    }
  } catch (err) {
    logger.error(`[Kakao OAuth Error] ${JSON.stringify(err.response?.data ?? err.message)}`);
    res.status(500).send('카카오 인증 중 오류가 발생했습니다.');
  }
}


function receiveSession(req, res) {
  const { sessionId, token } = req.body ?? {};
  logger.info(`[EXTENSION SESSION] sessionId: ${sessionId ?? '(none)'} | token: ${token ?? '(none)'}`);
  res.json({ ok: true });
}

module.exports = { redirectToKakao, handleCallback, receiveSession };
