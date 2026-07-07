const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
    registerSchema,
    loginSchema,
    logoutSchema,
    refreshSchema
} = require('../validations/auth.validation');

// Public — creates a new account, issues initial token pair.
router.post('/register', validate(registerSchema), asyncHandler(authController.register));

// Public — verifies credentials, issues token pair.
router.post('/login', validate(loginSchema), asyncHandler(authController.login));

// Public (no authMiddleware) — the refresh token itself IS the credential here.
// Rotates the refresh token and issues a new access token.
router.post('/refresh', validate(refreshSchema), asyncHandler(authController.refresh));

// Public (no authMiddleware) — revokes the given refresh token server-side.
router.post('/logout', validate(logoutSchema), asyncHandler(authController.logout));

// Protected — returns the current user's own profile, re-fetched from DB.
router.get('/profile', authMiddleware, asyncHandler(authController.getProfile));

module.exports = router;