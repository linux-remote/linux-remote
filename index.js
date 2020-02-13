const { execSync } = require('child_process');
const { username, projectName, homeDir } = require('./lib/constant');
const { errLog, warnLog } = require('./lib/util');
const os = require('os');

const args = process.argv;
const nodeSh = args[0];
const command = args[2];
let params = args.slice(3);
params = params.length ? ' ' + params.join(' ') : '';
const cmd = `${nodeSh} ./lib/${command}.js${params}`;

// 'root' user field:
if(command === 'init' || 
  command === 'su' || 
  command === 'uninit'){
  _execSync(cmd);
  return;
}

const userInfo = os.userInfo();
if(userInfo.username !== username){
  warnLog(`You need run command '${command}' as '${username}' user.`);
  console.log(`You can use the following command to switch:`);
  console.log(`\n${projectName} su\n`);
  return;
}

// 'linux-remote' user field:
// proxy to @linux-remote/manage
execSync(`linux-remote-manage ${command}${params}`, {
  cwd: homeDir
});


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