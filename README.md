# linux-remote
A Webside Remote Desktop of Linux.

This project is guide of two major projects:<br>
[client](https://github.com/linux-remote/client)<br>
[server](https://github.com/linux-remote/server)
## Requested
- A Linux system.
- Nodejs.
- SSH server on the Linux.
- Latest Chrome browsers.

## Install
**Step 1:** `git clone --depth 1 https://github.com/linux-remote/linux-remote.git`<br>
or<br>
`wget https://github.com/linux-remote/linux-remote/archive/master.zip -O "linux-remote.zip" && unzip -q linux-remote.zip && mv linux-remote-master linux-remote && rm linux-remote.zip`

<br>

**Step 2:** `cd ./linux-remote`

<br>

**Step 3:** Modify `config.js` eg:
```js
module.exports = {
  port: 3001, // listen port. default: 3001

  sshPort: 22, // SSH server. just used for login. default: 22

  ssl : null, // http model, Unsafe,  default: null.

  // ssl: { // https model
  //  cert: '/somedir/cert.pem',
  //  key: '/somedir/privkey.pem'
  // },
  
  sessionSecret: '' //some random str for the cookie encryption. required.
  /* 
    You can used nodejs crypto's randomBytes to generate it:
    var crypto = require('crypto');
    crypto.randomBytes(18).toString('base64') + Date.now();
  */
};
```

<br>

**Step 4:** For The Security:

`chmod 700 config.js`

You just can start by youself or root.


## Start
`node index.js`

<br>

You can use some process manager like `pm2`:

`pm2 start -o /dev/null -e /tmp/linux-remote-err.log index.js`

# Future
- C++ addons for json api. 
- Webscket push Server.
- Third party app and LANG package.
- Beautiful UI.
- Optimization

# Donate
Donate me or Be my sponsor.<br>

| Paypal | AliPay | WechatPay |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png"></a> | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2) | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2) |

## Patreon
[Du Wei is creating linux-remote](https://www.patreon.com/duwei)