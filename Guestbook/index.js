var http = require('http');
//var https = require('https');
var routes = require('./routes')

function requestListener (req, res) {
  routes.Routes(req, res);   
};
 
const hostname = 'localhost';
const port = 8000;
           
//const options = {
    //key: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/privkey.pem`),
    //cert: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/fullchain.pem`)
    //key: fs.readFileSync(`./live/${hostname}/privkey.pem`),
    //cert: fs.readFileSync(`./live/${hostname}/fullchain.pem`)    
//};
//const sslport = 443;
//https.createServer(options, requestListener).listen(sslport, hostname, () => {
//    console.log(`Server running at https://${hostname}:${sslport}/`)
//});
http.createServer(requestListener).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});