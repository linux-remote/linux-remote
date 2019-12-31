const execSync = require('child_process').execSync;
const stop = require('./stop');
const DIR = '/opt/linux-remote';
module.exports = function(){
  stop();
  execSync('userdel -r linux-remote');
  // userdel: linux-remote mail spool (/var/mail/linux-remote) not found
  execSync('groupdel linux-remote');
  execSync('rm -rf ' + DIR);

  console.log('\nlinux-remote uninit success.\n');
}

