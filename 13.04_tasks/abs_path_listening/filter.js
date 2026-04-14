const path = require("path");

function filterFiles(files, ext) {
    return files.filter(file => path.extname(file) === ext);
}
module.exports = filterFiles;