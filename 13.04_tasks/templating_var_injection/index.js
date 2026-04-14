const fs = require("node:fs");
const path = require("node:path");
const parsing = require("./template-engine");

const dir = ".";

const filePath = path.join(dir, "template.txt");
const text = fs.readFileSync(filePath, "utf-8");


const pathVariables = path.join(dir, "content.json");
const json = fs.readFileSync(pathVariables, "utf-8");
const variables = JSON.parse(json);

const content = parsing(text, variables);

const outputPath = path.join(dir, "output-data.txt");

fs.writeFileSync(outputPath, content, "utf-8");

