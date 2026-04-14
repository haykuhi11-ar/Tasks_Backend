const fs = require("fs");
const path = require("path");
const generateHTML = require("./generator");

const title = "HTML Page";
const content = generateHTML(title);

const dir = ".";
const file = "idx.html";

const filePath = path.join(dir, file);

fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error("error:", err);
        return;
    }
});