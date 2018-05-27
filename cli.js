#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fs = require('fs');
var pkg = require('./package.json');
var path = require('path');
var uid = require('uid-safe');

var args = process.argv.slice(1);
args.shift();
var param = args.join(' ');

switch(param){
  case '-v':
    console.log(pkg.version);
  break;
  case 'init':
    execSync('useradd -d /opt/linux-remote -m linux-remote');
    execSync('cp -r '+ path.join(__dirname, 'tpl') + '/. /opt/linux-remote');
    execSync('chown -R linux-remote:linux-remote /opt/linux-remote');
    execSync('chmod -R 700 /opt/linux-remote');
    console.log('linux-remote install complete!');
  break;
  case 'install':
    execSync('cd /opt/linux-remote');
    execSync('npm install');
    console.log('linux-remote install complete!');
    // function _install(){
    //   var config = require('/opt/linux-remote/config.js');
    //   execSync(config.installCommand);
    //   console.log('linux-remote install complete!');
    // }
    // _install();
  break;
  case 'update':
    execSync('cd /opt/linux-remote');
    execSync('npm update');
    console.log('linux-remote update complete!');
    // function _update(){
    //   var config = require('/opt/linux-remote/config.js');
    //   execSync(config.updateCommand);
    //   console.log('linux-remote update complete!');
    // }
    // _update();
  break;
  case 'start':
    execSync('cd /opt/linux-remote');
    execSync("su -c 'NODE_ENV=production nohup node index.js > /dev/null 2>err.log &' linux-remote");
    console.log('linux-remote start complete!');
  break;
  case 'stop':
    execSync('killall -u linux-remote');
    console.log('linux-remote stop complete!');
  break;
  case 'uninit':
    execSync('userdel -r linux-remote');
    console.log('linux-remote uninit complete!');
  break;
  default:
  console.log('param accepted:');
  console.log('-v, init, install, start, stop, update, uninit');
}