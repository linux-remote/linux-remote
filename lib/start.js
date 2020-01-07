
const execSync = require('child_process').execSync;
const net = require('net');
const { projectName, socketPath, homeDir } = require('./constant');
console.log(execSync('groups').toString())
return;
execSync(`NODE_ENV=production ${process.argv[0]} index.js >>/dev/null 2>>/dev/null &`, {
  cwd: homeDir
});


let count = 0;
const max = 12;

function loop(){
  count = count + 1;
  const client = net.createConnection(socketPath, function(){
    console.log(`\n[${projectName}]: Start success!\n`);
    client.destroy();
    process.exit();
  });
  client.on('close', function(hadErr){
    if(hadErr) {
      if(count < max){
        setTimeout(function() {
          loop();
        }, 500);
      }
    }
  })
}

setTimeout(function() {
  loop();
}, 1000);