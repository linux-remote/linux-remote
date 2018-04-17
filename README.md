# linux-remote
A webside remote desktop of Linux.
## Requested
- A Linux system.
- ssh server
- A Modern Browser: Chrome

## Install
`cd /opt`

`git clone --depth 1 https://github.com/linux-remote/linux-remote.git` 或者[直接下载](https://github.com/linux-remote/linux-remote/archive/master.zip)解压

`cd ./linux-remote`

`npm install`
## Config
修改  `./config.js`. 如下:
***http server:***
```js
module.exports = {
  port: 3000
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
***使用自签名ssl证书***
```js
module.exports = {
  port: 443,
  ssl: true,
  sslSelfSigned: {
    commonName: 'you domin name or ip',
    CA: null, // If not,will auto create. You can provide other CA:{key: 'somepath', cert: 'somepath'}
    CACertFirstDownloadKey: 'abc'
  }
};
```

## 开始
`sudo node index.js`

## 影响的文件夹
`/root/.linux-remote-data`

`/var/tmp/linux-remote`
