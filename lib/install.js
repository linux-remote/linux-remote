const { execSync } = require('child_process');
const path = require('path');
const { getDepPkg } = require('./util');
const { homeDir, projectName } = require('./constant');
const conf = require(path.join(homeDir, 'config.js'));

const needInstallPkg = getDepPkg(conf).join(' ');
execSync('npm install ' + needInstallPkg + ' --save', {
  cwd: homeDir
});

console.log(`\n[${projectName}]: Install success.\n`);
