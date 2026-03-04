const { Router } = require('express');
const userController = require('../controller/userController');

const router = Router();

router.get('/api/me', userController.getMe);
router.post('/api/logout', userController.logout);

module.exports = router;
