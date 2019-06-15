if(process.env.NODE_ENV !== 'production'){
  process.env.NODE_ENV = 'production';
};
console.log('linux-remote start!');
const server = require('../server');
const client = require('../client');
const userServer = require('../user-server');
const publicPath = require('../lr-public');
const config = require('./config');
client.publicPath = publicPath;
config.client = client;
config.userServerMain = userServer;
server(config);