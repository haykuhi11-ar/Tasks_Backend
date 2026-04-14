function toCamelCase(s) {
    return s.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function dataProcess(data) {
    const result = {};

    for (let key in data) {
        const newKey = toCamelCase(key);
        result[newKey] = data[key];
    }
    return result;
}
module.exports = dataProcess;