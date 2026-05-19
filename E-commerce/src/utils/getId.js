function getNewId(data) {
    const id = data.length
        ? Math.max(...data.map(u => u.id)) + 1
        : 1;

    return id;
}

module.exports = getNewId;