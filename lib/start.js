
const execSync = require('child_process').execSync;

const { logPath, errLogPath } = require('/linux-remote/conf/config.js');

module.exports = function(){
  execSync(`nohup node index.js >>${logPath} 2>>${errLogPath} &`);
  console.log('\nlinux-remote start success!\n');
}
