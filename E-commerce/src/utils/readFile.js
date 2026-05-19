const fs = require("node:fs");

function readFile(path) {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}

module.exports = readFile;