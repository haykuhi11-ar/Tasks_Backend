const net = require('node:net');

const users = new Map();

const getTime = () => {
    const nowTime = new Date();
    return nowTime.toTimeString().split(' ')[0];
}

const server = net.createServer((socket) => {
    console.log(`[${getTime()}] ***System: New client connected`);

    socket.write(`[${getTime()}] ***System: Welkome! Enter your name`);

    socket.on('data', (data) => {
        const message = data.toString().trim();
        
        if (!socket.username) {

            if (users.has(message)) {
                socket.write(`[${getTime()}] ***System: Username already taken. Try another:\n`);
                return;
            }

            socket.username = message;
            users.set(message, socket);

            socket.write(`Hello, ${socket.username}!\n`);
            console.log(`[${getTime()}]: User ${socket.username} joined`);
        } else if (message.startsWith('/dm')) {
            const parts = message.split(' ');
            const targetName = parts[1];
            const dmMessage = parts.slice(2).join(' ');

            const targetSocket = users.get(targetName);

            if (targetSocket) {
                targetSocket.write(`[${getTime()}] (Private from <${socket.username}>): ${dmMessage}\n`);
            } else {
                socket.write(`[${getTime()}] ***System: User ${targetName} not found\n`);
            }
        }
        else {
            console.log(`[${getTime()}] <${socket.username}> says: ${message}`);

            users.forEach((clientSocket) => {
                if (clientSocket !== socket) {
                    clientSocket.write(`[${getTime()}] <${socket.username}> says: ${message}\n`);
                }
            });
        }
    });

    socket.on('end', () => {
        if (socket.username) {
            users.delete(socket.username);
            console.log(`[${getTime()}] ${socket.username} disconnected`);
        }
    });
});

server.listen(3001, () => {
    console.log('Server started on port 3001');
});

