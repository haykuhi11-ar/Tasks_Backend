const fs = require('node:fs/promises');
const path = require('node:path');
const AppError = require('./AppError');
const dataFolder = path.join(__dirname, '../data');

async function readJson(filename) {
    try {
        const filepath = path.join(dataFolder, filename);
        const data = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(data);

    } catch (err) {
        console.error(err);
        throw new AppError(`file ${filename} not found`);
    }
}

async function writeJson(filename, data) {
    try {
        const filepath = path.join(dataFolder, filename);
        await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error(err);
        throw new AppError(`Cannot write to file ${filename}`);
    }
}

module.exports = { readJson, writeJson };