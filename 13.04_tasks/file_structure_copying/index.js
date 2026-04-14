const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const fileNameGenerator = require("./new_filename_generator");

const sourceFile = path.resolve(os.homedir(), "Desktop", "files", "0_file1.txt");
const newFilename = fileNameGenerator("0_file1.txt");

const destination = path.resolve(os.homedir(), "Desktop", "files", newFilename);

fs.copyFile(sourceFile, destination, (err) => {
    if (err) {
        console.error("Copy error:", err.message);
        return;
    }
});