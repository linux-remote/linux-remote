const { spawnSync, execSync } = require('child_process');
const { username } = require('./lib/constant');
const os = require('os');

const args = process.argv;
const nodeSh = args[0];
const command = args[2];
let params = args.slice(3);
params = params.length ? ' ' + params.join(' ') : '';
const cmd = `${nodeSh} ./lib/${command}.js${params}`;

if(command === 'init' || command === 'uninit'){
  _execSync(cmd);
  return;
}

const lrCmdMap = new Map([
  ['start', true],
  ['update', true],
  ['install', true],
]);

if(lrCmdMap.has(command)){
  // Run as user: linux-remote.
  // process.setgid('linux-remote') groups is: linux-remote root
  // used 'runuser' groups is: linux-remote

  // process.argv not have single quotes;
  const userInfo = os.userInfo();
  if(userInfo.username !== username){
    let runuserCmd = `runuser ${username} --shell=${process.env.SHELL} --command='${args.join(' ')}'`
    _execSync(runuserCmd);
    // LR_CMD_PARAMS=${_eCmd(params)} ${nodeSh} ${args[1]} ${command}
  } else {
    // let _lrCmd = cmd;
    // if(process.env.LR_CMD_PARAMS){
    //   _lrCmd = _lrCmd + _dCmd(process.env.LR_CMD_PARAMS);
    // }
    _execSync(cmd);
  }
}


function  _execSync(cmd){
  console.log(cmd);
  execSync(cmd, {
    cwd: __dirname,
    stdio: 'inherit'
  });
}

// function _eCmd(cmd){  // ' -> %27 ' ' -> %20
//   return escape(cmd);
// }
// function _dCmd(ecmd){
//   return unescape(ecmd);
// }