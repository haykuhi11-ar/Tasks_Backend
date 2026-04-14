const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const renamer = require("./file_renamer");

const dirPath = path.join(os.homedir(), "Desktop", "files");
fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error("Error reading directory:",  err.message);
        return;
    }

    files.forEach((file, index) => {
        const oldName = file;
        const newName = renamer(file, index);

        const oldPath = path.join(dirPath, oldName);
        const newPath = path.join(dirPath, newName);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Error renaming ${oldName}:`, err.message);
                return;
            }
            console.log(`Renamed: ${oldName} -> ${newName}`);
        });
    });
});
