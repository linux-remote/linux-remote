# linux-remote
<!-- A Webside Remote Desktop of Linux. -->
Linux Web Remote Desktop.

## Requested
- [Linux](https://github.com/torvalds/linux) 2.6+.
- [Node.js](https://nodejs.org) 8+. and ensure all users are available.
- A proper C compiler toolchain, like [GCC](https://gcc.gnu.org/).
## Browsers Compatibility
Latest **Chrome** And Latest **Firefox** work fine. 

Not ___IE___.

**Edge** and **Safari** unknown(it should be OK).

## Online Demo
First register a new user: 
https://register.linux-remote.org

Then visit demo:
https://demo.linux-remote.org

## Install
**Step 1:**

`npm install linux-remote -g`
The package of linux-remote  is a Zero-dependency CLI tool, <!--One file one command. Easily -->visible security.
**Step 2:**

`linux-remote init`

If you don't have GCC and want to use other compilers, You can add a parameter `cBuildTpl`. For example(using clang):<br>
`linux-remote init cBuildTpl='clang {{src}} -o {{out}}'`

<!-- This command requires root authority. -->
**Step 3:**
```
cd /opt/linux-remote
npm install
```
## Config

modify `./config.js`:
```js
module.exports = {
  port: 3001, // Website listen port. default: 3001
  host: undefined, // 
  // selfsigned ?
  // https://github.com/jfromaniello/selfsigned

  secure : null, // http model, default: null.
  /*
  // Provide an Object to enter https model: 
  secure: {
    certPath: '/xxx/xxx', 
    keyPath: '/xxx/xxx', 
    caPath: '/xxx/xxx', // Optionally

    //... Other options same as https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    // and cert, key, ca will take precedence.
  }
  */

  
  trustProxy: false, // Boolean, If you used proxy, You need set it. Otherwise, you will not get the real IP when you login.
  // More settings:  https://expressjs.com/en/guide/behind-proxies.html

  xPoweredBy: false, // Boolean, Enables the "X-Powered-By: Express" HTTP header.


  // ----------------- hotload -----------------
  // You change Just need linux-remote hotload.
  hotload: {
    cookieSecure: undefined, // Boolean, Cookie's option secure. If you are use https, You can set it true.
    publicCDN: null,
    publicCDNTplMap: {
      Jquery: 'https://bottom.cn/abc{{version}}/.js'
    },
    wsZip: true // ws 压缩
  }

};
```
## Management
You can add a normal user for management. So you will not need to enter `sudo`.
- add manager: `usermod -a -G linux-remote username`
- remove manager: `gpasswd -d username linux-remote` <!-- WTF name of gpasswd https://unix.stackexchange.com/questions/10852/whats-the-difference-between-sbin-nologin-and-bin-false -->
### Start 
`linux-remote start`
### Stop 
`linux-remote stop`

### Update 
`linux-remote update`
- `linux-remote-client` Updated, you don't need restart server. Just need refresh browser.
- `@linux-remote/user-server` Updated, you don't need restart server. Logined user need relogin.
- `linux-remote-server` Updated, you need restart server.  All logined user force logout when you restart server.

### Reload 
`linux-remote reload`
<!--
## hotload 
`linux-remote hotload`
-->
## uninstall 
groupdel ?
```
linux-remote uninit

npm uninstall linux-remote -g
```

## Other
<!--Configured with SSL certificate, your connection ( https and wss ) is secure. And you don't need verifying the Host Key first time like SSH.-->
If you don't have an SSL/TLS certificate, You can use [ssl-self-signed](https://github.com/linux-remote/ssl-self-signed) to generate a new one ( supports IP ).

## Donate
[patreon](https://www.patreon.com/hezedu): Du Wei is creating linux-remote

<!-- | Paypal | AliPay | WechatPay |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png" width="150"></a> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2" width="150"> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2" width="150"> -->

