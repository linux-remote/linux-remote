const {execSync} = require('child_process');
const { username } = require('./constant');

execSync(`su ${username} --shell=` + (process.env.SHELL || '/bin/sh'));