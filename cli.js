#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fs = require('fs');
var pkg = require('./package.json');
var path = require('path');
var crypto = require('crypto');
var os = require('os');
var tmpdir = os.tmpdir();
var errLogPath = path.join(tmpdir, 'linux-remote-err.log');
var args = process.argv.slice(1);
args.shift();
var param = args.join(' ');

process.stdin.setEncoding('utf8');

function _getSecret(){
  var buf = crypto.randomBytes(18);
  buf = buf.toString('base64');
  return buf + Date.now();
}
function initProject(){
  execSync('cp -r '+ path.join(__dirname, 'tpl') + '/. /opt/linux-remote');
  
  var configStr = fs.readFileSync('/opt/linux-remote/config.js', 'utf-8');
  configStr = configStr.replace('{{sessionSecret}}', _getSecret());
  fs.writeFileSync('/opt/linux-remote/config.js', configStr);

  execSync('chmod -R 755 /opt/linux-remote');

  execSync('chmod 700 /opt/linux-remote/config.js');

  execSync('chown -R linux-remote:linux-remote /opt/linux-remote');
  //console.log('init project ok.');
}

switch(param){
  case '-v':
    console.log(pkg.version);
  break;
  case 'init':
    execSync('useradd -d /opt/linux-remote linux-remote');
    initProject();
    //initLocal();
    console.log('linux-remote init complete!');
  break;
  case 'install':
    execSync('npm install', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote install complete!');

  break;
  case 'update':
    execSync('npm update linux-remote -g', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    execSync('npm update', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote update complete!');
  break;
  case 'start':
    execSync(`su -c 'NODE_ENV=production nohup node index.js >/dev/null 2>>${errLogPath} &' linux-remote`, {stdio : 'inherit', cwd: '/opt/linux-remote'});
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
  console.log('param  only accepted:');
  console.log('-v, init, install, start, stop, update, uninit');
}