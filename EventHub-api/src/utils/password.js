const bcrypt = require('bcrypt');

async function comparePassword(plainPassword, passwordHash) {
    return bcrypt.compare(plainPassword, passwordHash);
}

module.exports = {
    comparePassword
};