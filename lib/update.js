const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const { homeDir, projectName } = require('./constant');

function getDepVersion(mName){
  let mPath = require.resolve(mName);
  mPath = path.resolve(mPath, '../package.json');
  let content = fs.readFileSync(mPath, 'utf-8');
  content = JSON.parse(content);
  return content.version;
}

const needCheckModules = [
{
  name: 'linux-remote-server',
  type: 'stopStart'
},
{
  name: 'linux-remote-user-server',
  type: 'reLogin'
},
{
  name: 'lr-server-entrance',
  type: 'reload'
},
{
  name: 'linux-remote-client',
  type: 'reloadBrowser'
}];

needCheckModules.forEach(obj => {
  let name = obj.name;
  obj.oldVerison = getDepVersion(name)
});

execSync('npm update', {
  cwd: homeDir
});
console.log(`\n[${projectName}]: Update success.`);

let isNeedStopStart = false;
let isNeedReload = false;
let isNeedRelogin = false;
let isNeedReloadBrowser = false;

needCheckModules.forEach(obj => {

  const currVersion = getDepVersion(name);
  if(currVersion !== obj.oldVerison){
    if(!isNeedStopStart){
      isNeedStopStart = obj.type === 'stopStart'
    }
    if(!isNeedReload){
      isNeedReload = obj.type === 'reload'
    }
    if(!isNeedRelogin){
      isNeedRelogin = obj.type === 'reLogin'
    }
    if(!isNeedReloadBrowser){
      isNeedRelogin = obj.type === 'reloadBrowser'
    }
  }
});

let nextInfo = '';
if(isNeedStopStart){
  nextInfo = 'At next, You need: \nlinux-remote restart\nTo apply updates. Waring: All logged in users will crash and logout.\n';
} else if(isNeedReload){
  nextInfo = 'At next, You need: \nlinux-remote reload\nTo apply updates.\n';
}

console.log(nextInfo);
