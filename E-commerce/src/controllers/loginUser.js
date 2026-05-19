const path = require("node:path");
const readUsers = require("../utils/readFile");

function loginUser(req, res) {
    try {
        const pathUsers = path.join(__dirname, "../data/users.json");
        const users = readUsers(pathUsers);

        const { email, password } = req.body;

        const user = users.find(user =>
            user.email === email
            && user.password === password
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        
        return res.status(200).json({
            message: "Login successful",
            id: user.id,
            role: user.role
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = loginUser;