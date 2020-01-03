const os = require('os');

module.exports = {
  projectName: 'linux-remote',
  username: 'linux-remote',
  group: 'linux-remote',
  homeDir: '/opt/linux-remote',
  socketPath: os.tmpdir() + '/linux-remote/server.sock'
}