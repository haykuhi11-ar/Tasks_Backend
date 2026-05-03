const commandDM = (message, socket, users, getTime) => {
    const parts = message.split(' ');
    const userName = parts[1];
    const dmMessage = parts.slice(2).join(' ');

    const targetSocket = users.get(userName);

    if (targetSocket) {
        targetSocket.write(
            `[${getTime()}] (Private from <${socket.username}>): ${dmMessage}\n`
        );
    } else {
        socket.write(
            `[${getTime()}] ***System: User ${userName} not found\n`
        );
    }
    return;
}

const commandALL = (message, socket, users, getTime) => {
    const parts = message.split(' ');
    const allMessage = parts.slice(1).join(' ');

    for (const userSocket of users.values()) {
        userSocket.write(
            `[${getTime()}] (Message from all <${socket.username}>): ${allMessage}\n`
        );
    }
    return;
}

const commandUSERS = (message, socket, users, getTime) => {
    const userList = [...users.keys()].join(', ');
    socket.write(
        `[${getTime()}] online users: ${userList}\n`
    );
    return;
}

module.exports = {
    commandDM, 
    commandALL, 
    commandUSERS
};