const { spawnSync, execSync } = require('child_process');
const { username } = require('./lib/constant');
const os = require('os');



const args = process.argv;
const command = args[2];
if(command === 'init' || command === 'uninit'){
  _spawn();
  return;
}

const userInfo = os.userInfo();
// Run as user: linux-remote.
if(userInfo.username !== username){
  let cmd = `runuser ${username} --shell=${process.env.SHELL} --command='${args.join(' ')}'`

  // console.log('cmd', cmd);
  execSync(cmd, {
    // cwd: __dirname,
    stdio: 'inherit'
  })
  // spawnSync('runuser', [`--shell=${process.env.SHELL}`,
  // `--command='${args.join(' ')}'`],{
  //   cwd: __dirname,
  //   stdio: 'inherit'
  // })
  
  return;
}

switch(command){
  case 'start':
  case 'update':
  case 'install':
    _spawn();
    break;
}

function _spawn(){
  const nodeSh = args[0];
  const params = args.slice(3);

  spawnSync(nodeSh, ['./lib/' + command + '.js'].concat(params), {
    cwd: __dirname,
    stdio: 'inherit'
  });
}