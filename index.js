#!/usr/bin/env node

const { execSync } = require('child_process');
const { username,  homeDir } = require('./lib/constant');
const { warnLog } = require('./lib/util');
const os = require('os');

const args = process.argv;
const nodeSh = args[0];
const command = args[2];
let params = args.slice(3);
params = params.length ? ' ' + params.join(' ') : '';
const cmd = `${nodeSh} ./lib/${command}.js${params}`;

// 'root' user field:
if(command === 'init' || 
  command === 'uninit'){
  execSync(cmd, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  return;
}

// switch to 'linux-remote' user
const userInfo = os.userInfo();
if(userInfo.username !== username){
  console.log(`You need run command as '${username}' user.`);
  console.log(`You can use the following command to switch:`);
  warnLog(`\nsudo su ${username} --shell='bin/bash'\n`);
  return;
}

// 'linux-remote' user field:
// proxy to @linux-remote/manage
execSync(`linux-remote-manage ${command}${params}`, {
  cwd: homeDir
});
