const execSync = require('child_process').execSync;
const DIR = '/opt/linux-remote';

function uninit(){

  execSync('userdel -r linux-remote');
  // userdel: linux-remote mail spool (/var/mail/linux-remote) not found
  execSync('rm -rf ' + DIR);

  try{
    execSync('groupdel linux-remote');
  } catch(e){
    // groupdel: group 'linux-remote' does not exist
  }
  
  console.log('\nlinux-remote uninit success.\n');
}

uninit();