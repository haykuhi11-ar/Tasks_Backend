function logger(msg) {
    const time = new Date().toISOString();
    return `[${time}] ${msg}`;
}
module.exports = logger;