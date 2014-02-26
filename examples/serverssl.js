var http = require('http')
  , port = 9011
  , host = '127.0.0.1';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('+++++++++++++++++++++++++++++++++++++\n+++++ Hello World from SECURE 2 +++++\n+++++++++++++++++++++++++++++++++++++\n(I am on port ' + port + ')\n');
}).listen(port, host);


