module.exports = {
  port: 3001, // listen port. default: 3001

  sshPort: 22, // SSH server. just used for login. default: 22

  ssl : null, // http model, Unsafe,  default: null.

  // ssl: { // https model
  //  cert: '/somedir/cert.pem',
  //  key: '/somedir/privkey.pem'
  // },
  
  sessionSecret: '' //For the cookie encryption. required.
  /* 
    You can used Nodejs crypto's randomBytes to generate it:
    var crypto = require('crypto');
    crypto.randomBytes(18).toString('base64') + Date.now();
  */
};
