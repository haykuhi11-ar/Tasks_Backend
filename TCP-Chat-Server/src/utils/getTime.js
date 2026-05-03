const getTime = () => {
    const nowTime = new Date();
    return nowTime.toTimeString().split(' ')[0];
}

module.exports = getTime;