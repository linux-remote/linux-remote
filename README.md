# linux-remote
A Webside Remote Desktop of Linux.

This is a cli tool. Guide of two major projects:<br>
[client](https://github.com/linux-remote/client)<br>
[server](https://github.com/linux-remote/server)
## Requested
- A Linux system.
- SSH server on the Linux.
- Latest Chrome browsers.

## Install
**Step 1:** `npm install linux-remote -g`

<br>

**Step 2:** `linux-remote init`

It will create a new user `linux-remote`. So you should use `root` identity.

<br>


**Step 3:** `linux-remote install`

Install npm package. equal: `cd /opt/linux-remote && npm install`

<br>

**Step 4:** `cd /opt/linux-remote`

The Website config file **config.js** is in this folder.  For security,  It just can read or write for user `linux-remote`. So you should use `root` identity to modify it.
```js
module.exports = {
  port: 3001, // listen port. default: 3001
  sshPort: 22, // SSH server. just used for login. default: 22
  ssl : null, // http model, Unsafe, null or an Object {cert, key}, default: null.
  // ssl: { // https model
  //  cert: '/somedir/cert.pem',
  //  key: '/somedir/privkey.pem'
  // },
  
  sessionSecret: 'xxxxxxxx...' //auto generation by init, For the cookie encryption. You don't need to modify it.
};
```

___npm___: If you can't be used normally npm, You can put [.npmrc](https://docs.npmjs.com/files/npmrc) file in this folder.


## Start
`linux-remote start`

It will start the main process with user `linux-remote`. So you should use `root` identity(___Not starting with root___).
## Other
`linux-remote stop`

kill main process.

`linux-remote update`

Update npm package. equal: `cd /opt/linux-remote && npm update`

`linux-remote uninit`

Remove user `linux-remote` and delete `/opt/linux-remote` folder.

`linux-remote -v`

Show version of this cli.

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