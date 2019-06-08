// Just use for demo
const {app, handleServerUpgrade} = require('./index.js');
const demoConf = {
  port: 3002,
  ssl: {
    key: '',
    cert: ''
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
