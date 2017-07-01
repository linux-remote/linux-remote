# linux-remote
A Web App for Linux Remote Desktop.

Online Demo: https://lr.godmod.cn/

username: <b>guest</b>  password: <b>123</b>
# install
### Step 1
`git clone --depth 1 git@github.com:linux-remote/linux-remote.git` or 

[download](https://github.com/linux-remote/linux-remote/archive/master.zip)
this Project to you server <b>`/opt`</b> dir.
### Step 2
cd you dir,
run `npm install`

### Step 4
modefiy file `config.js` like:

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

***Non ssl's http server:***
```js
module.exports = {
  port: 3000
};
```
### Step 5
Start: `nohup node index.js &`

Or some other process manager like: `forever`, `pm2`.
