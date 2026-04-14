const fs = require("node:fs");
const path = require("node:path");
const data = require("./data.js");

const filePath = path.join(__dirname, "output.json");

function writeData() {
    const json = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, json, (err) => {
        if (err) {
            console.error("Write error:", err.message);
            return;
        }
        console.log("Data written to file!");
    });
}

module.exports = writeData;