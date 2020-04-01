# linux-remote
<!-- A Webside Remote Desktop of Linux. -->
Linux Web Remote Desktop.

## Requested
- [Linux](https://github.com/torvalds/linux) 2.6+.
- [Node.js](https://nodejs.org) 12+. and ensure all users are available.
- A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org/).
## Browsers Compatibility
Latest **Chrome** And Latest **Firefox** work fine.

Not ___IE___.

**Edge** and **Safari** Unknown.

## Online Demo
First register a new user: 
https://register.linux-remote.org

Then visit demo:
https://demo.linux-remote.org

## Install
### Step 1:

`npm install linux-remote -g`

The package of linux-remote  is a Zero-dependency CLI tool, <!--One file one command. Easilyvisible security for SUDO filed. -->good for safety review. In fact, only one command requires `sudo`.

###  Step 2:
`sudo linux-remote init`

it will create a user linux-remote.

If you don't have GCC and want to use other compilers, You can set env `C_BUILD_TPL`. For example(using clang):
`C_BUILD_TPL='clang {{src}} -o {{out}}' linux-remote init`

<!-- This command requires root authority. -->
###  Step 3:
`su linux-remote --shell="bin/bash"` 

Switch to user linux-remote. 

###  Step 4:
`cd /opt/linux-remote`

Modify the `config.js`. [See below](#Config).
###  Step 5:
`linux-remote install`

## Config
/opt/linux-remote/config.js<br>
<i>The `//# ` is option</i>
```js
module.exports = {
  port: 3001, // Website listen port.

  //# host: undefined, // Website listen host.

  secure : null, // http model
  /*
    // Or provide an Object to enter https model: 
    secure: {
      keyPath: '/xxx/xxx',
      certPath: '/xxx/xxx',
      pfxPath:  '/xxx/xxx', // eq keyPath + certPath
      caPath: '/xxx/xxx', // Optionally
      //... Other options same as https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    },
  */

  cookie: {
    //# secure: undefined,
    sameSite: 'None'
  },
  
  trustProxy: false, // Boolean, If you used proxy, You need set it. 
  // Otherwise, you will not get the real IP when you login.
  // And you can't set it true.
  // More settings:  https://expressjs.com/en/guide/behind-proxies.html

  
  client: { // Server include client. 
    cdn: false // Is use https://unpkg.com to load client static file.
  },
  /*
    // Or set a website origin string, enables CORS model. Server will not include client.
    // recommend.
    client: 'http://127.0.0.1:4000',
  */
  
  //# xPoweredBy: undefined // Express setttings. is enables the "X-Powered-By: Express" HTTP header.
};
```
## Management

### Start
`linux-remote start`

Start server.
### Stop
`linux-remote stop`

Stop server. All logined user will lose session(logout).
### Update 
`linux-remote update`

Update project packages, and will give you a hint: whether you need to reload.

### Reload
`linux-remote reload`

Reload server. Logined user will not lose session. 
### Restart
`linux-remote restart`

eq `linux-remote stop and linux-remote start`

All logined user will lose session(logout).

## uninstall
`sudo linux-remote uninit`<br>
You can also simply use: `userdel -r linux-remote`.

`npm uninstall linux-remote -g`

## Other
<!--Configured with SSL certificate, your connection ( https and wss ) is secure. And you don't need verifying the Host Key first time like SSH.-->
If you don't have an SSL/TLS certificate, You can use [ssl-self-signed](https://github.com/linux-remote/ssl-self-signed) to generate a new one ( supports IP ).

## Donate
[patreon](https://www.patreon.com/hezedu): Du Wei is creating linux-remote

<!-- | Paypal | AliPay | WechatPay |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png" width="150"></a> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2" width="150"> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2" width="150"> -->

