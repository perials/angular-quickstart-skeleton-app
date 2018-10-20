var http = require('http');
http.createServer(function (req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
  
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.write('{skey:"sval"}');
  res.end();
}).listen(8080);