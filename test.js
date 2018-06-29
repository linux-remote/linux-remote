process.env.NODE_ENV = 'production';
console.log('linux-remote start!');
const server = require('../linux-remote-server/index.js');
console.log('server starting...');
const client = require('../linux-remote-client/index.js');


const config = {
  port: 3001
}

config.client = client;

server(config);
