var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    httpProxy = require("http-proxy")
    port = process.env.VCAP_APP_PORT || 80;

var options = {
  host: 'localhost',
  port: 5984
};

//
// Create a new instance of HttProxy to use in your server
//
var proxy = new httpProxy.RoutingProxy();

http.createServer(function(request, response) {

  if(request.url.match(new RegExp('^/couchdb'))){
    console.log(request.url + "\n");

    request.url = request.url.replace('/couchdb', '');

    console.log(request.url)

    proxy.proxyRequest(request, response, options);
  } 
  else{ 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
  }
}).listen(port);
 
console.log("\nSERVER: Up and running");
