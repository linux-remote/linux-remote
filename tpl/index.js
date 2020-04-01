const path = require('path');

process.env.LR_SERVER_PATH = require.resolve('@linux-remote/server');
process.env.LR_USER_SERVER_PATH = require.resolve('@linux-remote/user-server');
process.env.LR_LOGIN_BIN_PATH = path.join(__dirname, './bin/lr-login');

require('@linux-remote/session-store');
