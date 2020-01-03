const net = require('net');

const { projectName, socketPath } = require('./constant');

const client = net.createConnection(socketPath, function(){
  client.setEncoding('utf-8')
  client.write('CLI_RELOAD');
  client.once('end', function(data){
    data = JSON.parse(data);
    if(data.type === 'error'){
      console.error(`\n[${projectName}]: reload fail. ${data.message}\n`);
    } else {
      let otherMsg = '';
      if(data.isHot){
        otherMsg = '(hot)';
      }
      console.log(`\n[${projectName}]: reload success.\n`);
    }
  })
})
