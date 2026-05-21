const bcrypt = require('bcrypt');

async function hashPassword(plain) {
    const hash = await bcrypt.hash(plain, 10);
    return hash;
}

async function verifyPassword(plain, hash) {
    return await bcrypt.compare(plain, hash);
}

module.exports = {hashPassword, verifyPassword}