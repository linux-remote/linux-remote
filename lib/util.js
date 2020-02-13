const fs = require('fs');
const {exec, execSync} = require('child_process');

const { homeDir, username, projectName } = require('./constant');

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

let _COLOR_MAP = {
  red: 31, 
  green: 32,
  yellow: 33, 
  cyan: 96
};
function simpleColor(style, str) {
  return '\u001b[' + _COLOR_MAP[style] + 'm' + str + '\u001b[39m';
}
function successLog(str){
  console.log(simpleColor('green', str));
}

function errLog(str){
  console.log(simpleColor('red', str));
}
function warnLog(str){
  console.log(simpleColor('yellow', str));
}
function getDepPkg(conf){
  const arr = [
  '@linux-remote/session-store', 
  'linux-remote-server', 
  'linux-remote-user-server'];
  
  if(conf.client){
    arr.push('linux-remote-client');
  }
}

function getGlobalDir(){
  // let globalDir = execSync('npm root -g');
  globalDir = path.join(__dirname, '../');
  return globalDir;
}

module.exports = {
  checkHomeDir,
  checkUser,
  simpleColor,
  successLog,
  errLog,
  warnLog,
  getDepPkg,
  getGlobalDir
}