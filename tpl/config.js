module.exports = {
  port: 3001, // Website listen port. default: 3001

  secure : false, // http model, Unsafe,  default: false.
  cookieSecure: true,
  /*
  // Or provide an Object to enter https model: 

  secure: {
    certPath: '/somedir/cert.pem',
    keyPath: '/somedir/privkey.pem', 

    //... Other options same as https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
  }
  */
};