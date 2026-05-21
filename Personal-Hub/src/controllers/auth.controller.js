const authService = require('../services/auth.service');
const AppError = require('../utils/AppError');
const date = require('../utils/date');
const { verifyPassword, hashPassword } = require("../utils/hash");
const { signToken } = require("../utils/token");

async function register(req, res) {
    const { username, password } = req.body;
    const user = await authService.findUser(username);
    if (user) {
        throw new AppError('This username already exists', 400);
    }
    
    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: Math.floor(Math.random() * 1000),
        username,
        password: hashedPassword,
        createdAt: date()
    }
    await authService.addUser(newUser);
    return res.status(201).send('User registered successfully');
    
}

async function login(req, res, next) {
    const { username, password } = req.body;
    const user = await authService.findUser(username);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    const validation = await verifyPassword(password, user.password);
    if (!validation) {
        throw new AppError('Invalid password', 401);
    }
    const token = signToken({
        id: user.id,
        username: user.username
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
    });

    return res.status(200).send('Login successful');
}

function logout(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    return res.status(200).send('Logged out successfully');
}

async function me(req, res) {
    const ownerId = req.ownerId;
    const user = await authService.getUserById(ownerId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    return res.status(200).json({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
    });
}

module.exports = {
    register,
    login,
    logout, 
    me
}
