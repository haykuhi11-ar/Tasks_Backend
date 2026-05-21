function generateId(prefix) {
    const id = prefix && prefix.length ? 
    Math.max(...prefix.map(item => item.id )) + 1 
    : 1;

    return id;
}

module.exports = generateId;