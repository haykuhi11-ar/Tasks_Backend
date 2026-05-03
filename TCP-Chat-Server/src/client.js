const net = require('node:net');
const readline = require('node:readline');

const client = net.createConnection({
    port: 3001,
    host: 'localhost'
});

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
    process.exit(0);
});

line.on('line', (input) => {
    client.write(input);
});