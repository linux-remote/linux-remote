var path = require('path');
var {execSync} = require('child_process');
var fs = require('fs');
const crypto = require('crypto');
var tplStr = fs.readFileSync(path.join(__dirname, 'tpl.config.js'), 'utf-8');

var secret = crypto.randomBytes(26).toString('base64');
tplStr = tplStr.replace('{{sessionSecret}}', secret);

var configPath = path.join(__dirname, 'config.js');
fs.writeFileSync(configPath, tplStr);

execSync('chmod 600 ' + configPath);

console.log('\nlinux-remote init OK!\n');