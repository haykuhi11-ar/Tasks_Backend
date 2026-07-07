const authService = require('../services/auth.service');
const refreshTokenService = require('../services/refreshToken.service');

async function register(req, res) {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    return res.status(201).json({ user, accessToken, refreshToken });
}

async function login(req, res) {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    return res.status(200).json({ user, accessToken, refreshToken });
}

async function refresh(req, res) {
    const { accessToken, refreshToken } = await refreshTokenService.rotateRefreshToken(req.body.refreshToken);
    res.status(200).json({ accessToken, refreshToken });
}

async function logout(req, res) {
    await authService.logout(req.body.refreshToken);
    return res.status(204).send();
}

async function getProfile(req, res) {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({ user });
}

module.exports = {
    register,
    refresh,
    login,
    logout,
    getProfile
};