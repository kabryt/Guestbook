var fs = require('fs');
var url = require('url');
var bodyParser = require('./zamodule');
var UserController = require('./controllers/users.controller')
module.exports = {
    Routes(req,res){
        var q = url.parse(req.url, true);
        const myRoute = "/"+q.pathname.split("/")[1];
        switch (myRoute) {
            case "/api":
                if (req.method === "GET") {
                    //response headers
                    res.writeHead(200, { "Content-Type": "application/json" });
                    //set the response
                    res.write("Hi there, This is a Vanilla Node.js API");
                    //end the response
                    res.end();
                }
            
                // If no route present
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route not found" }));
                }
                break;
            case "/users":
                if (req.method === "GET") {
                    const readuserdb = fs.readFileSync('userdb.json', {encoding:'utf8'});
                    //console.log(readuserdb);
        
                    //response headers
                    res.writeHead(200, { "Content-Type": "application/json" });
                    //set the response
                    res.write(readuserdb);
                    //end the response
                    res.end();
                    
                }
        
                else if (req.method === "POST") {
                    bodyParser(req,()=>UserController.createUser(req,res))
                    }       
                else if (req.method === "PUT") {
                    bodyParser(req,()=>edituser(req,res))
                    function edituser(req,res){
                        const readuserdb = fs.readFileSync('userdb.json', {encoding:'utf8'});
                        const db = JSON.parse(readuserdb);
                        //console.log(req.body);
                        const object=[];
                        db.forEach((item, index) => {
                            if (item.id == req.body.id) {
                                db[index].username = req.body.username;
                                db[index].email = req.body.email;
                                db[index].password = req.body.password;
                            }
                        });
                        //console.log(db);
                        fs.writeFileSync('userdb.json', JSON.stringify(db));
        
        
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write("MSG PUT");
                    res.end();
        
        
                    }
                    //let db2 = JSON.parse(readuserdb);
                    //db2=db2.filter(item=>item.id === nid);
                    //console.log(db2);
                    //fs.writeFileSync('userdb.json', JSON.stringify(db2));
                    
                    
                }
                
            
                // If no route present
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route not found" }));
                }
                break;
                case "/user":
                    //console.log(q.pathname);
        
                    const nid = q.pathname.split("/")[2];
                    //console.log(nid);
                    
                    if (req.method === "GET") {
                        const readuserdb = fs.readFileSync('userdb.json', {encoding:'utf8'});
                        const db = JSON.parse(readuserdb);
                        let object= [];
                        for (let item of db) {
                            if (nid===item.id) {
                                object = item;
        
                            }
                          };
                          //console.log(object);
                          //let item = [];
                          //db.forEach(function(object) { if (nid===object.id) {item = object
                          //}});
                        //console.log(nid);
                        //db=db.filter(item=>item.id === nid);
                        //console.log(db);
                        //}
        
        
                        res.writeHead(200, { "Content-Type": "application/json" });
                        
                        //set the response
                        res.write(JSON.stringify(object));
                        //end the response
                        res.end();
                    
        
            
                    }
                    else if (req.method === "PUT") {
                       
                        res.writeHead(200, { "Content-Type": "application/json" });
                        //set the response
                        res.write("MSG PUT");
                        //end the response
                        res.end();
                    
        
            
                    }
                    else if (req.method === "DELETE") {
                        const readuserdb = fs.readFileSync('userdb.json', {encoding:'utf8'});
                        let db1 = JSON.parse(readuserdb);
                        db1=db1.filter(item=>item.id != nid);
                        console.log(db1);
                        fs.writeFileSync('userdb.json', JSON.stringify(db1));
        
                        res.writeHead(200, { "Content-Type": "application/json" });
                        //set the response
                        res.write("MSG DEL");
                        //end the response
                        res.end();
                    
        
            
                    }
                    break;
                case "/":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let html = fs.readFileSync('index.html', {encoding:'utf8'});
                    //set the response
                    res.write(html);
                    //end the response
                    res.end();
                    break;
                
                case "/admin":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let adminhtml = fs.readFileSync('admin.html', {encoding:'utf8'});
                    //set the response
                    res.write(adminhtml);
                    //end the response
                    res.end();
                    break;    
        
                case "/myusers":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let uhtml = fs.readFileSync('usershtml.html', {encoding:'utf8'});
                    //set the response
                    res.write(uhtml);
                    //end the response
                    res.end();
                    break;    
            default :
            res.writeHead(200, { "Content-Type": "text/html" });
                    //set the response
                    res.write("<h1>404 Not Found</h1>");
                    //end the response
                    res.end();
                break;
        }
    }
}