var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res){                                                                                   console.log("req url=",req.url);
  switch (req.url) {
      case '/':
          sendFile('index.html', res);
          break;

      case '/subscribe':                                                                                                console.log("case '/subscribe':");
          chat.subscribe(req, res);
          break;
      case '/publish':                                                                                                  console.log("case '/publish': ");
          //chat.publish(".ASD.");
          // res.end("ok");
          var body = '';
          req.on('readable', function () {                                                                              console.log("case '/publish': on1 ",body);
              var read=req.read();
              if (read) body += read;

                  if(body.length>1e4){
                      res.statusCode = 413;
                      res.end("Your message is too big for my chat");
                  }
              })
              .on('end', function () {                                                                                  console.log("case '/publish on2': ",body);
                  try {
                      body = JSON.parse(body);
                  } catch(e){
                      res.statusCode = 400;
                      res.end("Bad Request");
                      return;
                  }
                  chat.publish(body.message);
                  res.end("ok");
               });
          break;

      default:
          res.statusCode = 404;
          res.end("Not found");
  }
}).listen(53002);

function sendFile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function() {
            res.statusCode = 500;
            res.end("Server error");
        })
        .pipe(res)
        .on('close', function() {
            fileStream.destroy();
        });
}