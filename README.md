# linux-remote 4 bata
<!-- A Webside Remote Desktop of Linux. -->
Linux Web Remote Desktop.
## Requested
- [Linux](https://github.com/torvalds/linux) 2.6+.
- [Node.js](https://nodejs.org) 12+. and ensure all users are available.
- A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org/).
## Browsers Compatibility
Latest **Chrome** And Latest **Firefox** work fine.

Not **IE**.

**Edge** and **Safari** Unknown.
<!--
## Online Demo
First register a new user:
https://demo.linux-remote.org:3001/

Then visit demo:
https://demo.linux-remote.org:3000/
-->
## Install
### Step 1:

`npm install linux-remote -g`

This [CLI](https://github.com/linux-remote/cli) tool is a Zero-dependency. good for safety review. Only one command requires `sudo`.

###  Step 2:
`sudo linux-remote init`

It will create a user "linux-remote".

If you don't have GCC and want to use other compilers, You can set env `C_BUILD_TPL`. For example(using clang):
`C_BUILD_TPL='clang {{src}} -o {{out}}' linux-remote init`

###  Step 3:
`sudo su linux-remote -s /bin/bash`

Switch to user linux-remote. 

###  Step 4:
`cd /opt/linux-remote`

Modify the `config.js`:

```js
// The //# is option
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
    //# sameSite: undefined
  },
  
  trustProxy: false, // Boolean, If you used proxy, You need set it. 
  // Otherwise, you will not get the real IP when you login.
  // And you can't set it true.
  // More settings:  https://expressjs.com/en/guide/behind-proxies.html

  client: {
    cdn: false // Is use https://unpkg.com to load client static file.
  }
};
```
###  Step 5:
`linux-remote install`

## Start
`linux-remote start`

Start server as "linux-remote" user.
## Other Management
The following command needs to be executed by the "linux-remote" user, except `-v`.

### stop
`linux-remote stop`

Stop server. All logined user will lose session(logout).
### update 
`linux-remote update`

Update project packages, and will give you a hint: whether you need to reload.

### reload
`linux-remote reload`

Reload server. Logined user will not lose session. 
### restart
`linux-remote restart`

eq `linux-remote stop and linux-remote start`

All logined user will lose session(logout).
### version
`linux-remote -v`

View version.
### serverinfo
`linux-remote serverinfo`

Check server info.
## Uninstall
`sudo linux-remote uninit`<br>
You can also simply use: `userdel -r linux-remote`.

`npm uninstall linux-remote -g`

## Secure
<!--Configured with SSL certificate, your connection ( https and wss ) is secure. And you don't need verifying the Host Key first time like SSH.-->
If you don't have an SSL/TLS certificate, You can use [ssl-self-signed](https://github.com/linux-remote/ssl-self-signed) to generate a new one ( supports IP ).

## Donate
[patreon](https://www.patreon.com/hezedu): Du Wei is creating linux-remote

<!-- | Paypal | AliPay | WechatPay |
| ------------- | ------------- | ------------- |
| <a href="https://www.paypal.me/hezedu" target="_blank"><img src="https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png" width="150"></a> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/alipay.png?raw=true&v=2" width="150"> | <img src="https://github.com/hezedu/SomethingBoring/blob/master/pay/wxpay.png?raw=true&v=2" width="150"> -->

