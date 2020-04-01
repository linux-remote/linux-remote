module.exports = {
  // host: undefined, // Website listen host.

  port: 3000, // Website listen port.

  secure : false, // http model, Unsafe.
  /*
  // Or provide an Object to enter https model: 
  secure: {
    keyPath: '/somedir/privkey.pem', // required
    certPath: '/somedir/cert.pem',
    caPath: '/somedir/ca.pem', // optional
    //... Other options same as https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
  },
  */

  cookie: {
    secure: false, // CORS mode should be set true.
    sameSite: 'none'
  },

  CORS: 'http://127.0.0.1:4000', // CORS mode, Server side does not contain client.
  // CORS: false, // Or set it false, to contain client.

  /*
  // Server side client options. Enabled only if CORS is false.
  // Only allow CDN option:
  client: {
    CDN: null,
    // CDN: true, // used: https://unpkg.com
    // CDN: 'somehost', // URL like unpkg's host
    // Or provide an object to configure details. See: https://github.com/linux-remote/client#CDN
  },
  */
};
