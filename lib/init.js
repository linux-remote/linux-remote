const path = require('path');
const {execSync, exec} = require('child_process');
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

    // Create User
    // '/usr/sbin/nologin' or '/bin/nologin'? used '/bin/false'
    execSync(`useradd ${username} --system -m --base-dir=${path.dirname(homeDir)} --skel=tpl --shell=/bin/false`, {cwd: path.join(__dirname, '../')});

    cBuildTpl = cBuildTpl || 'gcc {{src}} -o {{out}}';

    const cSrc = homeDir + '/src/lr-login.c';
    const buildOut = homeDir + '/bin/lr-login';
    let buildCmd = _cmdRender(cBuildTpl, {src: cSrc, out: buildOut});
    execSync(buildCmd);

    execSync('chmod 750 ' + buildOut);
    // Only 'linux-remote' group can be exec.
    execSync('chgrp linux-remote ' + buildOut);
    execSync('chmod u+s ' + buildOut);
   
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
