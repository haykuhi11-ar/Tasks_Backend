function toObject(fileContent) {
    const obj = {};
    const lines = fileContent.split("\n");

    for (let line of lines) {
        const [key, value] = line.split("=");
        if (key && value) {
            obj[key] = value;
        }
    }
    return obj;
}
module.exports = toObject;