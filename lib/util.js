const fs = require('fs');
const { exec, execSync } = require('child_process');

const { homeDir, username } = require('./constant');

function execSyncInherit(cmd, opt){
  opt = opt || Object.create(null);
  opt.stdio = 'inherit';
  opt.encoding = 'utf-8';
  console.log('exec: ' + cmd);
  return execSync(cmd, opt);
};

function checkHomeDir(callback){
  fs.stat(homeDir, function(err){
    if(err){
      if(err.code === 'ENOENT'){
        return callback(null);
      }
      callback(err);
    }
    let _err = new Error(`Homedir '${homeDir}' already exist.`);
    _err.isExist = true;
    callback(_err)
  })
}

function checkUser(callback){
  exec(`cat /etc/passwd | grep '^${username}'`, function(err, stdout, stderr){
    if(err){
      if(!stderr){
        return callback(null); // no output will get an Error.
      }
      return callback(new Error(stderr));
    }
    if(stdout){
      let _err = new Error(`User '${username}' already exist.`);
      _err.isExist = true;
      return callback(_err);
    }
    callback(null);
  })
}



function successLog(str){
  console.log(_simpleColor('green', str));
}

function errLog(str){
  console.error(_simpleColor('red', str));
}
function warnLog(str){
  console.error(_simpleColor('yellow', str));
}

const _COLOR_MAP = {
  red: 31, 
  green: 32,
  yellow: 33, 
  cyan: 96
};
function _simpleColor(style, str) {
  return '\u001b[' + _COLOR_MAP[style] + 'm' + str + '\u001b[39m';
}

module.exports = {
  checkHomeDir,
  checkUser,
  successLog,
  errLog,
  warnLog,
  execSyncInherit
}