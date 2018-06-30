# linux-remote
A Webside Remote Desktop of Linux.

This project is a guide for two major projects:<br>
[**linux-remote-client**](https://github.com/linux-remote/client)<br>
[**linux-remote-server**](https://github.com/linux-remote/server)
## Requested
- Linux.
- Nodejs.
- SSH server on the Linux.
- Latest Chrome browsers.
## Online Demo
https://lr.godmod.cn
<br>
username: **guest** <br>
password: **123**
## Install

**Step 1:** `cd /opt`

__/opt__ dir only writable for root. so you should use: `sudo`

<br>

**Step 2:** `sudo git clone --depth 1 https://github.com/linux-remote/linux-remote.git`<br>
or:<br>
`sudo wget https://github.com/linux-remote/linux-remote/archive/master.zip -O "linux-remote.zip" && sudo unzip -q linux-remote.zip && sudo mv linux-remote-master linux-remote && sudo rm linux-remote.zip`

If you don't want use **root** to start up. You should use: `sudo chown -R $(whoami) linux-remote`

<br>

**Step 3:** `cd ./linux-remote`

<br>

**Step 4:** `npm install`

<br>

**Step 5:** `node init`

It will generate config.js, and set permission. For The Security, The website can only start up by yourself or root.
<br>

**Step 6:** Setting `config.js`:
```js
module.exports = {
  port: 3001, // listen port. default: 3001

  sshPort: 22, // SSH server. just used for login. default: 22

  ssl : null, // http model, Unsafe,  default: null.

  // ssl: { // https model
  //  cert: '/somedir/cert.pem',
  //  key: '/somedir/privkey.pem'
  // },
  
  sessionSecret: 'some random str' //For the cookie encryption. generate by init. You don't need modify it.

};
```
## Start
`node index.js`

<br>

nohup start:

`nohup node index.js >/dev/null 2>>/tmp/linux-remote-err.log &`


You also can use some process manager like `pm2`:

`pm2 start index.js -o /dev/null -e /tmp/linux-remote-err.log --name linux-remote`


# Future
- C++ addons for json api.
- Webscket push Server.
- Third party app and language package.
- Beautiful UI.
- Optimization

# Donate
Donate me or Be my sponsor.<br>

| Paypal | AliPay | WechatPay |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png"></a> | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2) | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2) |

## Patreon
[Du Wei is creating linux-remote](https://www.patreon.com/duwei)

## Thank For
Not yet
