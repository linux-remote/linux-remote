const path = require('path');
const fs = require('fs');

const dir = process.cwd();
const pkg = require(path.join(dir, 'package.json'));
let name = pkg.name.split('/')[1];

const version = pkg.version;
const mapPath = path.join(__dirname, 'docs/version-map.json');
let map = fs.readFileSync(mapPath, 'utf-8');
map = JSON.parse(map);

if(map[name]){
  map._total = _genTotalVersion(name, version);
  map[name] = version;
  
  fs.writeFileSync(mapPath, JSON.stringify(map, null, ' '));
  console.log('linux-remote update versionMap success: ', name, version);
  console.log(map._total);
}

function _genTotalVersion(name, newVersion){
  let total = map._total; // 4.28.3.26-bata
  total = total.split('-');
  let totalSuffix = total[1];
  if(totalSuffix){
    totalSuffix = '-' + totalSuffix;
  } else {
    totalSuffix = '';
  }
  total = total[0];
  total = total.split('.');
  let mainVersion = total.shift();
  
  let currVersion = map[name];
  currVersion = currVersion.split('.');
  newVersion = newVersion.split('.');
  total = total.map((num, i) => {
    let totalN = Number(num) || 0;
    let newN = Number(newVersion[i]) || 0;
    let currN = Number(currVersion[i]) || 0;
    let result = totalN + (newN - currN);
    return result;
  });
  return `${mainVersion}.${total.join('.')}${totalSuffix}`;
}