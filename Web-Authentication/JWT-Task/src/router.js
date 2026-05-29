const express = require('express');
const router = express.Router();

const auth = require('./middlewares/auth.middleware');
const { login, register, me } = require('./auth.controller');
const isValid = require('./middlewares/validation.middleware');

router.post('/register', isValid, register );
router.post('/login', login);
router.get('/me', auth, me);
router.get('/posts', auth, me );

module.exports = router;