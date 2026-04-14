const fs = require("fs");
const path = require("path");
const filterFiles = require("./filter");

const dir = "./folder";
const ext = ".js";

fs.readdir(dir, (err, files) => {
    if(err) {
        console.error("error:", err);
    }
    const filter = filterFiles(files, ext);
    filter.forEach(file => {
        const filePath = path.resolve(path.join(dir, file));
        console.log(filePath);
    });
}); 