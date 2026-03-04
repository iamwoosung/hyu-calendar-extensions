const { Router } = require('express');
const oauthController = require('../controller/oauthController');

const router = Router();

// 카카오 OAuth
router.get('/auth/kakao', oauthController.redirectToKakao);
router.get('/auth/kakao/callback', oauthController.handleCallback);
router.get('/auth/success', oauthController.authSuccess);

module.exports = router;
