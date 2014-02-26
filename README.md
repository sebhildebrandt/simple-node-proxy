# simple-node-proxy

Simple Web-Proxy created with node.js - Version 0.0.1 - (MIT-license)

## Core concept

`simple-node-proxy` is a simple reverse proxy server for ingoing requests created with node.js. It is simple and easy to configure. The following types of proxies are available at the moment:

* **simple proxy**: routing from one IP:port to another IP:port)
* **multiple websites**: make several node apps running under different ports available on one single ingoing IP-address (and port 80 and/or 443)
* **load balancing**: implementing a basic round robin balancer

## Motivations

So why not did this with node? Well, I really like node.js, becaus of its simplicity and performance. I found the nodejitsu [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) and I added a small abstraction layer to it, creating a complete node-app. Just by modifying a simple config file, you can now create certain types of proxies. I am sure, there are certain alternatives to achieve this (e.g. nginx). Especially when it comes to performance, I do not know, if this app here would be the best choice, but anyway. I started just creating it as a proof-of-concept but now this one workes fine for me also fine in production-mode (so far).

## Using the proxy

### Installation

To install the prox, download the ZIP from github, unip it into your destimation folder. In the destination folder, you need to type the following command:

```
# npm install
```

This resolves the dependencies (currently only node-http-proxymodule).

### Configuration

The configuration is pretty simple. Just edit the `config.json`

Imagine, you have have the following domains pointing to your server, which has only one IP address:

* test1.loacl
* test2.local

(I modified /etc/hosts to be able to use those domain names)

The first one (test1.loacl) should be served by your first node-app - lets say, you start it on your server listening to port 9000 (no ssl port configured). The second domain (test2.local) should be served by your second node app (listening on port 9010, ssl on port 9011). This is, how your config file should look like:

```
{
	"port": 8080,
	"portssl": 8081,
	"ssl": true,
    "defaultsslkey" : "/path/to/ssl.key",
    "defaultsslcrt" : "/path/to/ssl.crt",
	"proxies" : {
		"test1.local": {
			"alias" : "*.test1.local",
			"host": "127.0.0.1",
    		"port": 9000,
			"ssl": false
		},
		"test2.local": {
			"alias" : "*.test2.local",
			"host": "127.0.0.1",
			"port": 9010,
			"ssl": true,
			"portssl": 9011,
        	"sslkey" : "/path/to/ssl.key",
        	"sslcert" : "/path/to/ssl.crt"
		}
	}
}
```

You can set up as many proxies as you like. 

### Starting the server

To start the server use the following command:

```
$ node proxy
```


## Additional Ideas:

As this is just the first version of this proxy server, I implemented just a few features. But there are more to come.  I plan to implement also 

* support for websockets
* load balancer
* blacklist - banned IPs
* allowed IPs - list of IPs that are allowed to access server

## Comments

If you have ideas or comments, please do not hesitate to contact me.


Happy proxying!

Sincerely,
Sebastian Hildebrandt
http://www.plus-innovations.com


#### Credits

Written by Sebastian Hildebrandt on top of nodejitsu [node-http-proxy](https://github.com/nodejitsu/node-http-proxy)

#### License

>The MIT License (MIT)
>
>Copyright (c) 2014 +innovations.
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.
> 
>Further details see "LICENSE" file.


