const os = require('os');
const projectName = 'linux-remote';
module.exports = {
  projectName,
  username: projectName,
  group: projectName,
  homeDir: '/opt/' + projectName,
  tmpDir: os.tmpdir() + '/' + projectName
}