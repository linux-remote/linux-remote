const path = require('path');
const os = require('os');
const {execSync} = require('child_process');
const { homeDir, username } = require('./constant');
const { checkUser, checkHomeDir, successLog } = require('./util');

// const param = process.argv[2];
// if(param){
//   const flag = 'cBuildTpl=';
//   if(param.indexOf(flag) === 0){
//     cBuildTpl = param.substr(flag + 1);
//   }
// }
// WTF: process.argv not have single quotes and double quotes. but  support "`";
// So use env.

let cBuildTpl = process.env.C_BUILD_TPL;

function init(){
  _preCheck(function(err){
    if(err){
      console.error(err.name + ': ' + err.message);
      return;
    }
    // -m, --create-home

    // useradd ${username}  --system -m --base-dir=${path.dirname(homeDir)} --shell=/bin/false
    // useradd linux-remote -m --base-dir=/opt --shell=/bin/false

    // cd /opt/linux-remote
    // npm install linux-remote 
    
    
    // Create User
    // '/usr/sbin/nologin' or '/bin/nologin'? used '/bin/false'
    execSync(`useradd ${username} --system -m --base-dir=${path.dirname(homeDir)} --skel=tpl --shell=/bin/false`, {cwd: path.join(__dirname, '../')});
    console.log('user add success.');
    cBuildTpl = cBuildTpl || 'gcc {{src}} -o {{out}}';
    
    const cSrc = homeDir + '/src/lr-login.c';
    const buildOut = homeDir + '/bin/lr-login';
    let buildCmd = _cmdRender(cBuildTpl, {src: cSrc, out: buildOut});
    execSync(buildCmd);
    console.log('build lr-login success.');
    execSync('chmod 700 ' + buildOut);
    // Only 'linux-remote' group can be exec.
    // execSync('chgrp linux-remote ' + buildOut);
    execSync('setfacl -m u:linux-remote:rx ' + buildOut);
    execSync('chmod u+s ' + buildOut);
    console.log('setfacl lr-login success.');
    
    const installManageCmd = 'npm install @linux-remote/manage@latest --save-exact';
    execSync(`runuser ${username} --shell=${os.userInfo().shell || '/bin/bash'} --command='${installManageCmd}'`, {
      cwd: homeDir
    });
    console.log('npminstall manage success.');
    successLog('\nlinux-remote init success!\n');

  })
}

init();

function _cmdRender(tpl, {src, out}){
  return tpl.replace('{{src}}', "'" + src + "'")
  .replace('{{out}}', "'" + out + "'");
}

function _preCheck(callback){
  checkUser(function(err){
    if(err){
      return callback(err);
    }
    checkHomeDir(function(err){
      if(err){
        return callback(err);
      }
      callback(null);
    })
  })
}
