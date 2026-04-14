const fs = require("node:fs");
const path = require("node:path");
const toObject = require("./parser");

const configPath = path.join(process.cwd(), "config.env");
fs.readFile(configPath, "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading config:", err);
        return;
    }

    const config = toObject(data);
    const requiredFields = ["PORT", "DB_HOST", "DB_USER"];

    for (let field of requiredFields) {
        if (!config[field]) {
            console.error(`Missing required field: ${field}`);
            return;
        }
    }
    
    console.log("config loaded successfully:", config);
});