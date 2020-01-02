const { spawnSync, execSync } = require('child_process');

const args = process.argv;
const nodeSh = args.shift();
args.shift();
const command = args.shift();


switch(command){
  case 'init':
  case 'uninit':
    _spawn();
    break;
}


process.setuid('linux-remote');
process.setgid('linux-remote');

switch(command){
  case 'init':
  case 'uninit':
  case 'update':
    _spawn();
    break;
  case 'install':
    execSync('npm install', {
      cwd: '/opt/linux-remote'
    });
    break;
}

function _spawn(){
  spawnSync(nodeSh, ['./lib/' + command + '.js'].concat(args), {
    cwd: __dirname,
    stdio: 'inherit'
  });
}