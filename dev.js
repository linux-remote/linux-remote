if(process.env.NODE_ENV !== 'production'){
  process.env.NODE_ENV = 'production';
};
const path = require('path');
console.log('linux-remote start!');
const server = require('../server');
const client = require('../client');
const userServer = require('../user-server');
const publicPath = require('../lr-public');
const config = require('./config');
client.publicPath = publicPath;
config.client = client;
config.userServerMain = userServer;
// config.ssl = {
//   cert: path.join(__dirname, '../../sss-output/192.168.56.101/server.crt'),
//   key: path.join(__dirname, '../../sss-output/192.168.56.101/server.key')
// }

server(config);
