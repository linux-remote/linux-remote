const {execSync} = require('child_process');
const { homeDir, username, projectName } = require('./constant');
const { checkUser, checkHomeDir, successLog } = require('./util');
function uninit(){
  _unPreCheck(function(err, result){
    if(err){
      console.error(err.name + ': ' + err.message);
      return;
    }

    if(result.userIsExist){
      execSync(`userdel -r ${username}`);
    } else if(result.homeDirIsExit){
      execSync(`rm -rf ${homeDir}`);
    }
    // userdel: -r linux-remote  will notice mail spool (/var/mail/linux-remote) not found
    if(!result.userIsExist && !result.homeDirIsExit){
      console.log(`'${projectName}' is not exist.`);
      return;
    }
    try{
      execSync(`groupdel ${username}`, {stdio: 'ignore'});
    } catch(e){
      // groupdel: group 'linux-remote' does not exist
    }
    
    successLog(`\n${projectName} uninit success.\n`);
  });
}

uninit();

function _unPreCheck(callback){
  let result = {
    userIsExist: true,
    homeDirIsExit: true
  }
  checkUser(function(err){
    if(err){
      if(!err.isExist){
        return callback(err);
      }
    } else {
      result.userIsExist = false;
    }
    checkHomeDir(function(err){
      if(err){
        if(!err.isExist){
          return callback(err);
        }
      } else {
        result.homeDirIsExit = false;
      }
      callback(null, result);
    })
  })
}