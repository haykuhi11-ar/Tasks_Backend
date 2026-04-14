const fs = require("node:fs");
const path = require("node:path");
const dirNames = require("./folders");

const dirs = dirNames();

dirs.forEach((dir) => {
    const dirPath = path.join(process.cwd(), dir);
    fs.mkdir(dirPath, {recursive: true}, (err) => {
        if (err) {
            console.log(`Error creating directory: ${dirPath}`);
        } else {
            console.log(`Directory creating successfully: ${dirPath}`);
        }
    });
});