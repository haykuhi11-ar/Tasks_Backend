const fs = require("node:fs");
const path = require("node:path");
const writeData = require("./writeData.js");

const filePath = path.join(__dirname, "output.json");

fs.stat(filePath, (err, stats) => {
    if (err) {
        if (err.code === "ENOENT") {
            writeData();
        } else {
            console.error("Error reading file:", err.message);
        }
        return;
    }

    const sizeInBytes = stats.size;
    console.log("File size:", sizeInBytes, "bytes");

    if (sizeInBytes >= 1024) {
        console.log("File is too large, skipping...");
        return;
    } 
    writeData();
});