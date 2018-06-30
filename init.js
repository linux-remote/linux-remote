var crypto = require('crypto');
var path = require('path');
var {execSync} = require('child_process');
var fs = require('fs');


var tplStr = fs.readFileSync(path.join(__dirname, 'config.tpl.js'), 'utf-8');


var secret = crypto.randomBytes(18).toString('base64') + Date.now();
tplStr = tplStr.replace('{{sessionSecret}}', secret);

var configPath = path.join(__dirname, 'config.js');
fs.writeFileSync(configPath, tplStr);

execSync('chmod 700 ' + configPath);

console.log('\n linux-remote init OK!');