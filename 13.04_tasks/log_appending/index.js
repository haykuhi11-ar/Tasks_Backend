const fs = require("node:fs");
const path = require("node:path");
const logger = require("./log");

const logPath = path.join(process.cwd(), "log.txt");

function writeLog(msg) {
    const line = logger(msg) + "\n";

    fs.appendFile(logPath, line, (err) => {
        if (err) {
            console.error("Log write ERROR:", err);
        }
    });
}

writeLog("App started");
writeLog("User clicked button");
writeLog("User opened profile page");