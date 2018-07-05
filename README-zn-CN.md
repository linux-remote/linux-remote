# linux-remote
[English](README.md) | 中文

一个网页端的 Linux 远程桌面。

本项目是另外两个主要项目的引导:<br>
[**client**](https://github.com/linux-remote/client)<br>
[**server**](https://github.com/linux-remote/server)
## 必要项
- Linux.
- Nodejs.
- Linux 上需要有 SSH 服务器。(只是用来登录)
- 最新的 Chrome 浏览器。
## 线上演示
https://lr.godmod.cn
<br>
用户名: **guest** <br>
密码: **123**
## 安装

**第 1 步:** `cd /opt`

___/opt___ 目录只 root 用户有修改权限。所以你应该使用：`sudo`

<br>

**第 2 步:** `sudo git clone --depth 1 https://github.com/linux-remote/linux-remote.git`<br>
或者:<br>
`sudo wget https://github.com/linux-remote/linux-remote/archive/master.zip -O "linux-remote.zip" && sudo unzip -q linux-remote.zip && sudo mv linux-remote-master linux-remote && sudo rm linux-remote.zip`

如果你不想用 **root** 身份启动。 你应该： `sudo chown -R $(whoami) linux-remote`

<br>

**第 3 步:** `cd ./linux-remote`

<br>

**第 4 步:** `npm install`

<br>

**第 5 步:** `node init`

它将会生成 config.js，并设置权限。为了安全，网站只能由你自己或 root 来启动。
<br>

**第 6 步:** 配置 `config.js`:
```js
module.exports = {
  port: 3001, // 网站监听端口. 默认: 3001

  sshPort: 22, // SSH 服务器监听端口,  默认: 22

  ssl : null, // http 模式, 不安全, 默认: null.
  /*
  ssl: {  // 或者提供一个 Object {cert, key} 来开启 https 模式: 
    cert: '/somedir/cert.pem',
    key: '/somedir/privkey.pem'
  },
  */
  
  sessionSecret: 'some random str' // express-session 用. 由 init 自动生成. 你不需要修改.

};
```
## 开始
`node index.js`

<br>

你也可以使用一些进程管理工具，比如 `pm2`:

`pm2 start index.js -o /dev/null -e /tmp/linux-remote-err.log --name linux-remote`

<br>

## 更新
`cd /opt/linux-remote && npm update`

## 未来
- C++ addons for json api.
- Webscket push Server.
- Third party app and language package.
- Beautiful UI.
- Optimization

## 捐赠
捐赠我或成为我的赞助商。<br>

| Paypal | 支付宝 | 微信支付 |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png"></a> | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2) | ![image](https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2) |

## Patreon
[Du Wei is creating linux-remote](https://www.patreon.com/duwei)

## 感谢
见[README.md](README.md#thanks-for)
