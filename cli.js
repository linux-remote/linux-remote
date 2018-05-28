#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fs = require('fs');
var pkg = require('./package.json');
var path = require('path');
var uid = require('uid-safe');

var args = process.argv.slice(1);
args.shift();
var param = args.join(' ');

process.stdin.setEncoding('utf8');

function initProject(){
  execSync('cp -r '+ path.join(__dirname, 'tpl') + '/. /opt/linux-remote');
  execSync('chown -R linux-remote:linux-remote /opt/linux-remote');

  var configStr = fs.readFileSync('/opt/linux-remote/config.js', 'utf-8');
  configStr = configStr.replace('{{sessionSecret}}', uid.sync(30));
  fs.writeFileSync('/opt/linux-remote/config.js', configStr);

  execSync('chmod -R 700 /opt/linux-remote');
  //console.log('init project ok.');
}
function initLocal(){
  var dir = '/var/local/linux-remote';
  execSync('mkdir -m=755 -p ' + dir);
  execSync('chown linux-remote:linux-remote ' + dir);
  execSync('mkdir -m=1777 -p ' + dir + '/session');
  execSync('chown linux-remote:linux-remote ' + dir + '/session');
  execSync('mkdir -m=1777 -p ' + dir + '/user');
  execSync('chown linux-remote:linux-remote ' + dir + '/user');
  //console.log('init local data ok.');
}
switch(param){
  case '-v':
    console.log(pkg.version);
  break;
  case 'init':
    execSync('useradd -d /opt/linux-remote linux-remote');
    initProject();
    initLocal();
    console.log('linux-remote init complete!');
  break;
  case 'install':
    execSync('npm install', {stdio : 'inherit', cwd: '/opt/linux-remote'});
    console.log('linux-remote install complete!');
    // console.log('linux-remote install complete!');
    // function _install(){
    //   var config = require('/opt/linux-remote/config.js');
    //   execSync(config.installCommand);
    //   console.log('linux-remote install complete!');
    // }
    // _install();
  break;
  case 'update':
    execSync('npm update', {stdio : 'inherit', cwd: '/opt/linux-remote'});
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

      process.stdin.write('Do you want to keep user data? [y/n]:');
      process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) {
          chunk = chunk.toLowerCase();
          chunk = chunk.trim();
          if (chunk === 'n') {
            execSync('rm -rf /var/local/linux-remote');
            console.log('linux-remote clear user data ok.');
          }
          done();
          function done(){
            execSync('userdel -r linux-remote');
            console.log('linux-remote uninit complete!');
            process.stdin.end();
          }
        }
      });

  break;
  default:
  console.log('param accepted:');
  console.log('-v, init, install, start, stop, update, uninit');
}