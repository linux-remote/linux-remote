var path = require('path');
var {execSync} = require('child_process');
var fs = require('fs');
const uuidv4 = require('uuid/v4');
var tplStr = fs.readFileSync(path.join(__dirname, 'tpl.config.js'), 'utf-8');

var secret = uuidv4();
tplStr = tplStr.replace('{{sessionSecret}}', secret);

var configPath = path.join(__dirname, 'config.js');
fs.writeFileSync(configPath, tplStr);

execSync('chmod 600 ' + configPath);

console.log('\nlinux-remote init OK!\n');