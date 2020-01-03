// 改用 linux-remote stop linux-remote start
const {execSync} = require('child_process');

execSync(process.argv[0] + ' ./stop.js', {
  cwd: __dirname
});

execSync(process.argv[0] + ' ./start.js', {
  cwd: __dirname
});
