if(process.env.NODE_ENV !== 'production'){
  process.env.NODE_ENV = 'production';
};
console.log('linux-remote start!');
const server = require('linux-remote-server');
const userServer = require('linux-remote-user-server');
const client = require('linux-remote-client');

const config = require('./config');

config.client = client;
config.userServerMain = userServer;
server(config);
