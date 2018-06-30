#!/usr/bin/env node

var {execSync, spawnSync} = require('child_process');
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
    //initLocal();.npmrc
    console.log('linux-remote init complete!');
    console.log('Config path is: "/opt/linux-remote/config.js"');
    console.log('If you want set some npm config(like --registry), You can put ".npmrc" in the "/opt/linux-remote" folder.\n');
  break;
  case 'install':
    execSync('npm install', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote install complete!\n');

  break;
  case 'update':
    execSync('npm update', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote update complete!\n');
  break;
  case 'start':
    execSync(`su -c 'NODE_ENV=production nohup node index.js >/dev/null 2>>${errLogPath}&' linux-remote`, {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote start complete!\n');
  break;
  case 'stop':
    spawnSync('killall', ["-u", "linux-remote"], {stdio:"inherit"});
    console.log('linux-remote stop complete!\n');
  break;
  case 'uninit':
    execSync('userdel -r linux-remote');
    console.log('linux-remote uninit complete!\n');
  break;
  default:
  console.log('param  only accepted:');
  console.log('-v, init, install, start, stop, update, uninit');
}