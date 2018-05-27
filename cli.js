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


// process.stdout.write('Are you sure to delete :\u001b[91m' + param + '\u001b[39m ? [y/n]:');

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     chunk = chunk.toLowerCase();
//     chunk = chunk.trim();
//     if (chunk === 'y') {
//       console.log('Deleting...');
//       var time = Date.now();

//       removeTree(
//         param,
//         {
//           process: function processLog(c1, c2) {
//             process.stdout.cursorTo(0);
//             process.stdout.write('\u001b[93m' + c2 + '/' + c1 + '\u001b[39m');
//           },
//           onFail: function(name, err){
//             console.error(name, err.name, err.message);
//           }
//         },
//         function(err, result) {
//         if (err) {
//           console.error('\nDelete failed');
//         } else {
//           var msg = '\n';
//           var errCount = result.errCount;
//           if(errCount){
//             msg += 'End, A total of \u001b[91m' + errCount + '\u001b[39m files deleted failed, Please close other programs that may occupy the folder and try again.\n';
//           }else{
//             msg += 'Delete \u001b[92msuccess\u001b[39m. ';
//           }
//           msg += 'Max deep: \u001b[96m' + result.deep + '\u001b[39m. Time cost:\u001b[96m' + ((Date.now() - time) / 1000) + 's\u001b[39m';
//           console.log(msg);
//         }
//         //process.stdin.end();
//       });
//     }
//       process.stdin.end();
//   }
// })