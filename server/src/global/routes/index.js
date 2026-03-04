const { Router } = require('express');
const oauthRoutes = require('../../domain/oauth/routes/oauth');
const userRoutes = require('../../domain/user/routes/user');
const lmsRoutes = require('../../domain/lms/routes/lms');

const router = Router();

router.use(oauthRoutes);
router.use(userRoutes);
router.use(lmsRoutes);

module.exports = router;
