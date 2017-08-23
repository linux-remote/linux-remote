# linux-remote
web端linux-remote远程桌面，纯前端项目。前端使用的[vue](https://github.com/vuejs/vue), 后端使用的[express](https://github.com/expressjs/express)。
## Env
后端: **Linux**系统,并有`ssh server`.

前端: 只支持**Chrome**
## Demo
Online: https://lr.godmod.cn/

用户名(游客): <b>guest</b>  密码: <b>123</b>
## 安装
`cd /opt`

`git clone --depth 1 https://github.com/linux-remote/linux-remote.git`(or download:
[linux-remote-master.zip](https://github.com/linux-remote/linux-remote/archive/master.zip))

`cd ./linux-remote`

`npm install`
## 配置
修改  `./config.js`. 如下:

***使用自签名ssl证书***
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

***使用现成ssl证书***
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
## 开始
`sudo node index.js`

## 影响的文件夹
`/root/.linux-remote-data`

`/var/tmp/linux-remote`
