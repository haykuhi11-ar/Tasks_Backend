const express = require('express');
const authControl = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/auth/register', authControl.register);
router.post('/auth/login', authControl.login);
router.post('/auth/logout', authControl.logout);
router.get('/auth/me', authMiddleware, authControl.me);

module.exports = router;