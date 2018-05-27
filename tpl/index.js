const server = require('linux-remote-server');
const client = require('linux-remote-client');
const config = require('./config');

config.client = client;
server(config);