if(process.env.NODE_ENV !== 'production'){
  process.env.NODE_ENV = 'production';
};
console.log('linux-remote start!');
const server = require('linux-remote-server');
const client = require('linux-remote-client');
const config = require('./config');

config.client = client;
server(config);