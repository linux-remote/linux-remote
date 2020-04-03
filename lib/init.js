const path = require('path');
const os = require('os');
const { homeDir, username } = require('./constant');
const { checkUser, checkHomeDir, successLog, execSyncInherit } = require('./util');





function init(){
  // process.argv not have single quotes and double quotes. but  support "`";
  // So use env.
  let cBuildTpl = process.env.C_BUILD_TPL;

  _preCheck(function(err){
    if(err){
      console.error(err.name + ': ' + err.message);
      return;
    }

    // Create User
    // -m, --create-home
    // '/usr/sbin/nologin' or '/bin/nologin'? used '/bin/false'
    execSyncInherit(`useradd ${username} --system -m --base-dir=${path.dirname(homeDir)} --skel=tpl --shell=/bin/false`, {cwd: path.join(__dirname, '../')});
    console.log('user add success.');
    cBuildTpl = cBuildTpl || 'gcc {{src}} -o {{out}}';
    
    const cSrc = homeDir + '/src/lr-login.c';
    const buildOut = homeDir + '/bin/lr-login';
    let buildCmd = _cmdRender(cBuildTpl, {src: cSrc, out: buildOut});
    execSyncInherit(buildCmd);
    console.log('build lr-login success.');
    execSyncInherit('chmod 700 ' + buildOut);
    // execSyncInherit('chgrp linux-remote ' + buildOut);
    execSyncInherit('setfacl -m u:linux-remote:rx ' + buildOut);
    execSyncInherit('chmod u+s ' + buildOut);
    console.log('setfacl lr-login success.');
    console.log('npminstalling manage...');
    const installManageCmd = 'npm install @linux-remote/manage@latest --save-exact';
    execSyncInherit(`runuser ${username} --shell=${os.userInfo().shell || '/bin/bash'} --command='${installManageCmd}'`, {
      cwd: homeDir
    });
    console.log('npminstall manage success.');
    successLog('\nlinux-remote init success!\n');
  });
}

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

module.exports = init;
