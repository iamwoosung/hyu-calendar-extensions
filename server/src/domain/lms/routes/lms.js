const { Router } = require('express');
const lmsController = require('../controller/lmsController');

const router = Router();

router.post('/api/lms/sync', lmsController.sync);

module.exports = router;
