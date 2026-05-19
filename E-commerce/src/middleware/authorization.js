const path = require("node:path");
const readFileUsers = require("../utils/readFile");

function authorization(req, res, next) {

    try {
        const pathUsers = path.join(__dirname, "../data/users.json");
        const users = readFileUsers(pathUsers);
        const id = Number(req.headers.id);

        if (id === null || Number.isNaN(id)) {
            return res.status(401).json({
                message: "Unauthorized: please sign in"
            });
        }

        const user = users.find(u => 
            u.id === id
        );
        
        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = authorization;