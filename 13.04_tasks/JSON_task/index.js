const dataProcess = require("./data-processor");
const fs = require("fs");
const path = require("path");

const jsonInput = path.join(".", "input.json");
const jsonOut = path.join(".", "output.json");

const data = fs.readFileSync(jsonInput, "utf-8");
const parseData = JSON.parse(data);
const dProcess = dataProcess(parseData);
const json = JSON.stringify(dProcess, null, 2);
fs.writeFileSync(jsonOut, json);