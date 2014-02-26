var http = require('http')
  , port = 9000
  , host = '127.0.0.1';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('..... Hello World from Server 1 ..... \n(I am on port ' + port + ')\n');
}).listen(port, host);