const users = [
    { username: "alice", password: "pass123" },
    { username: "bob", password: "abc-pass" },
    { username: "charlie", password: "pass-abc" }
];

function basicAuth(req, res, next) {

    const auth = req.headers.authorization;

    if (!auth) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({
            message: 'Authenticate required'
        });
    }

    const base64 = auth.split(' ')[1];
    const [username, password] = Buffer.from(base64, 'base64').toString().split(':');

    const user = users.find(u => 
        u.username === username 
        && u.password === password
    );

    if (!user) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    req.user = user;
    next();
}

module.exports = basicAuth;