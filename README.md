# linux-remote
web端linux-remote远程桌面，纯前端项目。前端使用的[vue](https://github.com/vuejs/vue), 后端使用的[express](https://github.com/expressjs/express)。
## Demo
Online: https://lr.godmod.cn/

username: <b>guest</b>  password: <b>123</b>
## install
`cd /opt`

`git clone --depth 1 https://github.com/linux-remote/linux-remote.git`(or download:
[linux-remote-master.zip](https://github.com/linux-remote/linux-remote/archive/master.zip))

`cd ./linux-remote`

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
`sudo node index.js`

## 影响的文件夹
`/root/.linux-remote-data`

`/var/tmp/linux-remote`
