const net = require('net');

const { projectName, socketPath } = require('./constant');

const client = net.createConnection(socketPath, function(){
  client.setEncoding('utf-8');
  client.write('CLI_GET_SESSIONS');
  client.on('end', function(data){
    data = JSON.parse(data);
    if(data.count !== 0){
      process.stdin.setEncoding('utf8');

      console.log(`\n[${projectName}]: ${data.count} users are logged in.`);
      
      process.write('Do you want to forcefully destroy their session? [y/n]:');
      process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) {
          chunk = chunk.toLowerCase();
          chunk = chunk.trim();
          if (chunk === 'y') {
            stop();
          }
          process.stdin.end();
        }
      });
    } else {
      stop();
    }
  });
})

function stop(){
  let isWillStop = false;
  const client = net.createConnection(socketPath, function(){
    client.setEncoding('utf-8');
    client.write('CLI_STOP');

    client.on('data', function(data){
      if(data === 'willStop'){
        isWillStop = true;
      }
    });

    client.on('close', function(){
      if(isWillStop){
        console.log(`\n[${projectName}]: Stop success.\n`);
      } else {
        console.error(`\n[${projectName}]: Stop fail.\n`);
      }
    });
  })
}
