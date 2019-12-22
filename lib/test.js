
const request = require('request');
request({
  method: 'get',
  url: 'http://192.168.56.101:3000/api/user/guest/desktop/bundle',
  headers: {

    'X-Requested-With': 'XMLHttpRequest',
    // firefox geust
    //sid=s%3AbmwzPzYXZDn3Jk0fGiToHr1FsMAszeso149092216201.ONrIjtbY4AvJ0R5FeXsb6YZghrCMoJoOdV3IuPQQTYI
    // chrome dw
    // sid=s%3A021lwwxmDYTDCa71Cr7XTQyJYw-HPknZ149092216202.fcRqyPDKZWMR6I8bTmagKULdxX5IuFLLAOVeWWLG%2Fmw

    Cookie: 'sid=s%3AbmwzPzYXZDn3Jk0fGiToHr1FsMAszeso149092216201.fcRqyPDKZWMR6I8bTmagKULdxX5IuFLLAOVeWWLG%2Fmw'
  }
}, function(err, response, body){
  console.log('body', body)
})