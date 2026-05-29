const AppError = require('./utils/AppError');
const { hashPassword, verifyPassword } = require('./utils/hash');
const { signToken } = require('./utils/token');
const users = [
    {
        username: 'Alice',
        email: 'alice456@gmail.com',
        password: '$2b$10$R/59VjYOJpILYynr6ThHjOgiGaXI0LWUgJfYNvDJIDsCWmwupxE76'  // Alice456%
    }
];

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const newUser = {
            username,
            email,
            password: hashedPassword
        };

        users.push(newUser);
        console.log(users);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
    }

}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = users.find(u =>
            u.email === email);
            console.log(user);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const verify = await verifyPassword(password, user.password);
        if (!verify) {
            throw new AppError('Invalid password', 401);
        }

        const payload = {
            email: user.email,
            username: user.username
        };

        const token = signToken(payload);
        console.log(token);
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
    }

}

function me(req, res) {
    const user = users.find(u => 
        u.username === req.user.username &&
        u.email === req.user.email
    );

    if (!user) {
        throw new AppError('Internal server error', 500);
    }

    return res.status(200).json(user);
}

module.exports = {
    register,
    login,
    me
};