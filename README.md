# linux-remote
A Web App for Linux Remote Desktop.

Online Demo: https://lr.godmod.cn/
username: <b>guest</b>, password: <b>123</b>
# install
### Step 1
Create file `package.json`:
```json
{
  "name": "my-linux-remote",
  "private": true,
  "main": "index.js",
  "dependencies": {
    "linux-remote": "*"
  }
}
```
### Step 2
run: `npm install`

### Step 3
Create file `index.js` like:

***Use self-signed's ssl server:***
```js
var linuxRemote = require('linux-remote');
linuxRemote({
  port: 3000,
  ssl: true,
  sslSelfSigned: {
    commonName: 'you domin name or ip',
    CA: null, // If not,will auto create. You can provide other CA:{key: 'somepath', cert: 'somepath'}
    CACertFirstDownloadKey: 'abc'
  }
});
```

***Use self's ssl certificate server:***
```js
var linuxRemote = require('linux-remote');
linuxRemote({
  ssl: {
    cert: '/etc/letsencrypt/live/lr.godmod.cn/cert.pem',
    key: '/etc/letsencrypt/live/lr.godmod.cn/privkey.pem'
  },
  port: 443
});
```

***Non ssl's http server:***
```js
var linuxRemote = require('linux-remote');
linuxRemote({
  port: 3000
});
```
### Step 4
Start:

`nohup node index.js &`
Or some other process manager like: `forever`, `pm2`.
