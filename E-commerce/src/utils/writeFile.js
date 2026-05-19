const fs = require("node:fs");

function writeFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = writeFile;