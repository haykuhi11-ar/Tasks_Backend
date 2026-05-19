const readUsers = require("../utils/readFile");
const writeUsers = require("../utils/writeFile");
const path = require("node:path");
const getNewId = require("../utils/getId");

function registerUser(req, res) {
    try {
        const usersPath = path.join(__dirname, "../data/users.json");
        const users = readUsers(usersPath);

        const { username, email, password } = req.body;


        const user = users.find(u =>
            u.email === email
        );

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = {
            id: getNewId(users),
            username,
            email,
            password,
            role: "customer"
        };

        users.push(newUser);
        writeUsers(usersPath, users);
        return res.status(201).json(newUser);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = registerUser;