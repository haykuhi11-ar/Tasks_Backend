const { readJson, writeJson } = require('../utils/fileDb');

function usersRead() {
    const users = readJson('users.json');
    return users;
}

function usersWrite(users) {
    writeJson('users.json', users);
}

module.exports = { usersRead, usersWrite }