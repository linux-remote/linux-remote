module.exports = {
  port: 3001, // listen port. default: 3001

  sshPort: 22, // SSH server. just used for login. default: 22

  ssl : null, // http model,  Unsafe, null or an Object {cert, key}. default: null.

  // ssl: { // https model
  //  cert: '/somedir/cert.pem',
  //  key: '/somedir/privkey.pem'
  // },
  
  sessionSecret: '{{sessionSecret}}' //For the cookie encryption. generate by init. You don't need modify it.
};
