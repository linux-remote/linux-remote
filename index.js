#!/usr/bin/env node

"use strict";
const os = require('os');
const { username, homeDir } = require('./lib/constant');
const { warnLog } = require('./lib/util');


const args = process.argv;
const command = args[2];

// 'root' user field:
if(command === 'init'){

  const init = require('./lib/init');
  init();

} else if(command === 'uninit'){

  const uninit = require('./lib/uninit');
  uninit();

} else {
  
  // switch to 'linux-remote' user
  const userInfo = os.userInfo();
  if(userInfo.username !== username){

    console.log(`You need run command as '${username}' user.`);
    console.log(`You can use the following command to switch:`);
    warnLog(`\nsudo su ${username} -s /bin/bash\n`);

  } else {
    const manageMPath = require.resolve('@linux-remote/manage', {
      paths: [ homeDir + '/node_modules']
    })
    const managerHandler = require(manageMPath);
    managerHandler(command);
  }

  // 'linux-remote' user field:
  // proxy to @linux-remote/manage
  // execSync(`linux-remote-manage ${command}${params}`, {
  //   cwd: homeDir
  // });

}




