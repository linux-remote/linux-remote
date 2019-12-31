const { spawnSync } = require('child_process');

const args = process.argv;
const nodeSh = args.shift();
args.shift();
const command = args.shift();

switch(command){
  case 'init':
  case 'uninit':
    spawnSync(nodeSh, ['./lib/' + command + '.js'].concat(args), {
      cwd: __dirname,
      stdio: 'inherit'
    });
    return;
}