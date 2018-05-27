#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fs = require('fs');
var pkg = require('./package.json');
var path = require('path');

var args = process.argv.slice(1);
args.shift();
var param = args.join(' ');

switch(param){
  case '-v':
    console.log(pkg.version);
  break;
  case 'install':
    execSync('useradd -d /opt/linux-remote -m linux-remote');
    execSync('cp -r '+ path.join(__dirname, 'tpl') + '/. /opt/linux-remote');
    execSync('chown -R linux-remote:linux-remote /opt/linux-remote');
    execSync('chmod -R 755 /opt/linux-remote');
    console.log('linux-remote install complete!');
  break;
  case 'start':
    execSync('cd /opt/linux-remote');
    execSync("su -c 'nohup node index.js > /dev/null 2>err.log &' linux-remote");
    console.log('linux-remote start complete!');
  break;
  case 'stop':
    execSync('killall -u linux-remote');
    console.log('linux-remote stop complete!');
  break;
  case 'uninstall':
    execSync('userdel -r linux-remote');
    console.log('linux-remote uninstall complete!');
  break;
  default:
  console.log('param accepted:');
  console.log('-v, install, start, stop, uninstall');
}