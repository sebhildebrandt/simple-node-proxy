# simple-node-proxy

Simple Web-Proxy created with node.js - Version 0.0.1

## Idea

simple-node-proxy is a simple proxy server which was created with node.js. It is simple and easy to configure. You can create the following types of proxies:

* **simple proxie**: routing from one IP:port to another IP:port)
* **multiple websites**: make several node apps running under different ports available on one single IP-address and port 80 and/or 443

## Motivations

So why not do this also with node? I found nodejitsu node-http-proxymodule and I added a small abstraction layer to it, creating a complete node-app. Just by modifying a simple config file, you can now create certain types of proxies. I know, there are certain alternatives to achieve this (e.g. nginx). Especially when it comes to performance, I do not know, if this would be the right choice. So first that was just created as a proof-of-concept but now this one workes fine for me also for production so far.

## Configuration

The configuration is pretty simple. Just edit the config.json 

Imagine, you have have the following domains pointing to your Server, which has only one IP address:

* your-server-1.com
* your-server-2.com

The first one should be served by your first node-app - lets say, you start it on your server listening to port 1330 (no ssl port configured). The second domain should be served by your second node app (listening on port 1340, ssl on port 1341). This is, how your config file should look like:

```
{
	"host": "localhost",
	"port": 80,
	"portssl": 443,
	"proxies" : {
		"your-server-1.com": {
			"port": 1330,
			"ssl": false
		},
		"your-server-2.com": {
			"port": 1340,
			"ssl": true,
			"portssl": 1341,
        	"key" : "/path/to/ssl.key",
        	"crt" : "/path/to/ssl.crt"
		}
	}
}
```

## Additional Ideas:

As this is just the first version of this proxy server, I implemented just a few features. But there are more to come.  I plan to implement also 

* support for websockets
* load balancer

## Comments

If you have ideas or comments, please do not hesitate to contact me.
