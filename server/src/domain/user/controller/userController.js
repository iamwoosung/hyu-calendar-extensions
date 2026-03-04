const session = require('../../../global/modules/session');

function getMe(req, res) {
  const { session: sessionId } = req.query;

  if (!sessionId || !session.get(sessionId)) {
    return res.status(401).json({ error: '유효하지 않거나 만료된 세션입니다.' });
  }

  res.json({ user: session.get(sessionId) });
}

function logout(req, res) {
  const { session: sessionId } = req.query;
  if (sessionId) session.remove(sessionId);
  res.json({ ok: true });
}

module.exports = { getMe, logout };
