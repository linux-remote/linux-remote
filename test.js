const linuxRemote = require('./index.js');
linuxRemote({
  ssl: true,
  sslSelfSigned:{
    commonName: '192.168.56.101'
  },
  port: 3001
});
