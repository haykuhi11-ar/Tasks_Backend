const path = require("node:path");

function generatorNewName(filename) {
    const ext = filename.split(".").pop();
    const name = path.basename(filename, ext);
    return `${name}_backup.${ext}`;
}
module.exports = generatorNewName;