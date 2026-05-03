const net = require('node:net');
const getTime = require('./utils/getTime.js');
const allCommands = require('./utils/commands.js')

const users = new Map();
const commands = new Map([
    ["/dm", allCommands.commandDM],
    ["/all", allCommands.commandALL],
    ["/users", allCommands.commandUSERS]
]);

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

            socket.write(
                `Hello, ${socket.username}!

                Choose command type:

                /dm user message --> send private message
                /all message     --> send message to everyone
                /users           --> show all users
                \n`);
            console.log(`[${getTime()}]: User ${socket.username} joined`);
            return;
        } 
        if (message.startsWith('/')) {
            const command = message.split(' ')[0];
            const handler = commands.get(command);

            if (handler) {
                handler(message, socket, users, getTime);
            } else {
                socket.write(`***System: Unknown command\n`);
            }
            return;
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

