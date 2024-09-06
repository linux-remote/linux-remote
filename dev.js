const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3005;
const server = http.createServer(function(req, res){
  console.log(req.method, req.url);
  let file = req.url.substr(1);
  if(!file){
    file = 'index.html';
  }
  const files = fs.readdirSync(path.join(__dirname, 'docs'));
  if(!files.includes(file)){
    res.statusCode = 404;
    res.end('notFound');
    return;
  }

  fs.readFile(path.join(__dirname, 'docs/' + file), function(err, content){
    if(err){
      res.statusCode = 500;
      res.end(err.name + ':' + err.message);
    } else {
      let i = file.lastIndexOf('.');
      if(i !== -1){
        let suffix = file.substr(i + 1);
        if(suffix === 'svg'){
          res.setHeader('content-type', 'image/svg+xml');
        }
      }
      res.end(content);
    }
  })
})

server.listen(PORT);

server.on('listening', function(){
  console.log('server listening', PORT);
})
