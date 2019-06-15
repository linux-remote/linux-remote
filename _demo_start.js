// Just use for demo
const {app, handleServerUpgrade} = require('./index.js');
const path = require('path');
const demoConf = {
  port: 3003,
  ssl: {
    key: '/opt/demo-of-ssl-self-signed/output/149.129.62.26/server.key',
    cert: '/opt/demo-of-ssl-self-signed/output/149.129.62.26/server.crt'
  }
}

const demoServer = https.createServer({
  key: fs.readFileSync(demoConf.ssl.key, 'utf-8'),
  cert: fs.readFileSync(demoConf.ssl.cert, 'utf-8')
}, app);
demoServer.listen(demoConf.port);
demoServer.on('listening', () => {
  console.log('linux remote demo server start!\n');
});
handleServerUpgrade(demoServer);
