const execSync = require('child_process').execSync;
const stop = require('./stop');

module.exports = function(){
  stop();
  execSync('userdel -r linux-remote');
  execSync('groupdel linux-remote');
  console.log('\nlinux-remote uninit success.\n');
}

