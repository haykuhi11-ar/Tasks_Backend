function validateUser(req, res, next) {
    const { username, email, password } = req.body;

    if (!username) {
        return res.status(400).json({
            message: "Username is required"
        });
    }

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        });
    }
    next();
}

module.exports = validateUser;