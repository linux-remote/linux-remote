process.env.NODE_ENV = 'production';

const server = require('../linux-remote-server');
//const client = require('linux-remote-client');

function start(conf){
  conf.client = '/mnt/git/linux-remote-client/dist/pro';
  return server(conf);
}
start({
  port: 3001
});
