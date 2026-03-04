const { v4: uuidv4 } = require('uuid');

const SESSION_TTL_MS = 5 * 60 * 1000;
const sessions = new Map();

function create(user) {
  const sessionId = uuidv4();
  sessions.set(sessionId, user);
  setTimeout(() => sessions.delete(sessionId), SESSION_TTL_MS);
  return sessionId;
}

function get(sessionId) {
  return sessions.get(sessionId) ?? null;
}

function remove(sessionId) {
  sessions.delete(sessionId);
}

module.exports = { create, get, remove };
