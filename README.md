# linux-remote
web端linux-remote远程桌面
## 需求: 
- Linux
- ssh server
- 浏览器: Chrome

## 安装
`cd /opt`

`git clone --depth 1 https://github.com/linux-remote/linux-remote.git`

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
