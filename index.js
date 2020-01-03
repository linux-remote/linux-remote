const { spawnSync, execSync } = require('child_process');
const { username } = require('./constant');
const os = require('os');
const args = process.argv;
const nodeSh = args.shift();
args.shift();
const command = args.shift();


if(command === 'init' || command === 'uninit'){
  _spawn();
  return;
}

const userInfo = os.userInfo();
// Run as user: linux-remote.
if(userInfo.username !== username){
  process.setuid('linux-remote');
  process.setgid('linux-remote');
}

switch(command){
  case 'update':
  case 'install':
    _spawn();
    break;
}

function _spawn(){
  spawnSync(nodeSh, ['./lib/' + command + '.js'].concat(args), {
    cwd: __dirname,
    stdio: 'inherit'
  });
}