const {execSync} = require('child_process');
const { username } = require('./constant');
const os = require('os');

execSync(`su ${username} --shell=${os.userInfo().shell}`);
