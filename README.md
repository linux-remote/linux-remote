# linux-remote
A Web App for Linux Remote Desktop.

Online Demo: https://lr.godmod.cn/

username: <b>guest</b>  password: <b>123</b>
## install
`cd /opt`<br/>
`git clone --depth 1 https://github.com/linux-remote/linux-remote.git` <br/>
(or download:
[linux-remote-master.zip](https://github.com/linux-remote/linux-remote/archive/master.zip))
`cd ./linux-remote`<br/>
`npm install`

## Config
modefiy  `./config.js`. Such as:

***Use self-signed's ssl server:***
```js
module.exports = {
  port: 3000,
  ssl: true,
  sslSelfSigned: {
    commonName: 'you domin name or ip',
    CA: null, // If not,will auto create. You can provide other CA:{key: 'somepath', cert: 'somepath'}
    CACertFirstDownloadKey: 'abc'
  }
};
```

***Use self's ssl certificate server:***
```js
module.exports = {
  ssl: {
    cert: '/etc/letsencrypt/live/lr.godmod.cn/cert.pem',
    key: '/etc/letsencrypt/live/lr.godmod.cn/privkey.pem'
  },
  port: 443
};
```

***http server:***
```js
module.exports = {
  port: 3000
};
```
## Start
Need start as root:

`sudo node index.js`

This project initialization will create two files on your computer:

`/root/.linux-remote-data`

`/var/tmp/linux-remote`
