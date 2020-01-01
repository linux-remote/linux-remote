const { spawnSync } = require('child_process');

const args = process.argv;
const nodeSh = args.shift();
args.shift();
const command = args.shift();


switch(command){
  case 'init':
  case 'uninit':
    _spawn();
    return;
}


process.setuid('linux-remote');
process.setgid('linux-remote');

switch(command){
  case 'init':
  case 'uninit':
    _spawn();
    return;
}

function _spawn(){
  spawnSync(nodeSh, ['./lib/' + command + '.js'].concat(args), {
    cwd: __dirname,
    stdio: 'inherit'
  });
}