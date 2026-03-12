const env = process.argv[2] || 'dev';
require('dotenv').config({ path: `pkg.env.${env}` });

const logger = require('./modules/logger');
const mq = require('./config/mq');
const lmsSync = require('./handlers/lmsSync');

// 메시지 타입 → 핸들러 매핑
const handlers = {
  LMS_SYNC: lmsSync.handle,
};

(async () => {
  logger.info(`Consumer 시작 (env: ${env})`);
  await mq.connect(handlers);
})();
