const env = process.argv[2] || 'dev';
require('dotenv').config({ path: `pkg.env.${env}` });

const serverAppUse = require('./global/loaders/serverAppUse');

const PORT = process.env.PORT || 3000;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || `http://localhost:${PORT}/auth/kakao/callback`;

const app = serverAppUse();

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`카카오 콜백 URI: ${KAKAO_REDIRECT_URI}`);
});
