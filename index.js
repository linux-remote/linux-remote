process.env.NODE_ENV = 'production';
const server = require('linux-remote-server');
const client = require('linux-remote-client');

function start(conf){
  conf.client = client;
  return server(conf);
}

module.exports = start;
