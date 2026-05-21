const { usersRead, usersWrite } = require("../models/user.model");
const AppError = require("../utils/AppError");

async function addUser(user) {
    const users = await usersRead();
    users.push(user);
    await usersWrite(users);
}

async function findUser(username) {
    const users = await usersRead();
    const user = users.find(u => 
        u.username === username 
    );
    
    return user || null;
}

async function getUserById(ownerId) {
    const users = await usersRead();
    const user = users.find(u => 
        u.id === ownerId
    );
    
    return user || null;
}

module.exports = {
    addUser,
    findUser,
    getUserById
}