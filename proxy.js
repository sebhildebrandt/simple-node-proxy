// ========================================================================
// simple node proxy
// ------------------------------------------------------------------------
// Description:   Simple Web-Proxy created with node.js
// Copyright:     (c) 2014 
// Author:        Sebastian Hildebrandt
// ------------------------------------------------------------------------
// License:       MIT
// ========================================================================

var http = require('http')
  , https = require('https')
  , httpProxy = require('http-proxy')
  , fs = require('fs')
  , url = require( 'url' )
  , crypto = require("crypto");

// -----------------------------------------------------
// read configuration file
// -----------------------------------------------------

var arguments = process.argv.splice(2);
var config = require('./config.json');

var port =    arguments[0] || config.port     || 80;
var portssl = arguments[1] || config.portssl  || 443;
var ssl = config.ssl;

var proxy = [];
var proxyssl = [];
var certs = {};


// -----------------------------------------------------
// generic function to read certificates
// -----------------------------------------------------

function getCredentialsContext (keyfile, crtfile) {
return crypto.createCredentials({
  key: fs.readFileSync(keyfile),
  cert: fs.readFileSync(crtfile)
}).context;
}

// -----------------------------------------------------
// creating proxy servers based on config.json
// -----------------------------------------------------

console.log('PROXY Setup');

var proxy = httpProxy.createServer();

for (var key in config.proxies) {
    proxy[key] = {
      proxy: httpProxy.createProxyServer(),
      host: "http://" + config.proxies[key].host, 
      port: config.proxies[key].port
    };
    console.log('    Set up proxy for: ' + key + ':' + config.proxies[key].port);

    // ssl
    if (config.proxies[key].ssl) {
        certs[key] = getCredentialsContext(config.proxies[key].sslkey, config.proxies[key].sslcrt);
        proxyssl[key] = {
          proxy: httpProxy.createProxyServer(),
          host: "http://" + config.proxies[key].host, 
          port: config.proxies[key].portssl
        };
        console.log('    Set up SSL proxy for: ' + key + ':' + config.proxies[key].portssl);
    };
}

console.log('');

// -----------------------------------------------------
// starting the main server
// -----------------------------------------------------

var server = http.createServer( function( req, res ) {
  var serve_host = req.headers.host.split(":")[0];

  console.log('  Serve ' + serve_host + ' -> ' + proxy[serve_host].host + ':' + proxy[serve_host].port)
  proxy[serve_host].proxy.web(req, res, {target : proxy[serve_host].host + ':' + proxy[serve_host].port});

});
console.log("Proxy listening on port " + port);
server.listen(port);

// -----------------------------------------------------
// starting the ssl server
// -----------------------------------------------------

if (ssl) {

  var options = {
    key: fs.readFileSync(config.defaultsslkey),
    cert: fs.readFileSync(config.defaultsslcrt),
    https: {
        SNICallback: function (hostname) {
            return certs[hostname];
        }
    },
    hostnameOnly: true
  };

  var server_ssl = https.createServer(options, function( req, res ) {
    var serve_host = req.headers.host.split(":")[0];

    console.log('  Serve SSL ' + serve_host + ' -> ' + proxyssl[serve_host].host + ':' + proxyssl[serve_host].port)
    proxyssl[serve_host].proxy.web(req, res, {target : proxyssl[serve_host].host + ':' + proxyssl[serve_host].port});
  });
  console.log("SSL Proxy listening on port " + portssl);
  server_ssl.listen(portssl);
}

console.log('');
