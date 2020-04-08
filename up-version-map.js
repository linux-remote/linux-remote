const path = require('path');
const fs = require('fs');

const dir = process.cwd();
const pkg = require(path.join(dir, 'package.json'));
let name = pkg.name.split('/')[1];
if(dir === __dirname){
  name = 'cli';
}
const version = pkg.version;
const mapPath = path.join(__dirname, 'docs/version-map.json');
let map = fs.readFileSync(mapPath, 'utf-8');
map = JSON.parse(map);
if(map[name]){
  map[name] = version;
  fs.writeFileSync(mapPath, JSON.stringify(map, null, ' '));
  console.log('linux-remote update versionMap success: ', name, version);
}