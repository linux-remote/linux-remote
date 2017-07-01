# linux-remote
A Web App for Linux Remote Desktop.

Online Demo: https://lr.godmod.cn/

username: <b>guest</b>  password: <b>123</b>
# install
### Step 1
mkdir in directory `/opt`. Such as: `/opt/linux-remote`.

`git clone --depth 1 git@github.com:linux-remote/linux-remote.git` or
[download](https://github.com/linux-remote/linux-remote/archive/master.zip)
this Project to you dir.
### Step 2
cd you dir

run `npm install`
### Step 3
modefiy  `config.js` in you dir. Such as:

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
# Start
`nohup node index.js &`

Or some other process manager. Such as: `forever`, `pm2`.
