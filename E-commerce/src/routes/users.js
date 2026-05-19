const express = require("express");
const router = express.Router();
const registerUsers = require("../controllers/registerUser");
const validateUser = require("../middleware/validateUser");
const loginUser = require("../controllers/loginUser");

router.post('/register', validateUser, registerUsers);
router.post('/login', loginUser);

module.exports = router;