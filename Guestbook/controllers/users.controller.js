var fs = require('fs');
var crypto = require('crypto');
module.exports ={
    createUser(req, res){
        req.body.id=crypto.randomBytes(16).toString("hex");
        const readuserdb = fs.readFileSync('./userdb.json', {encoding:'utf8'});  
        const alluser = JSON.parse(readuserdb);
        
        alluser.push(req.body);
        fs.writeFileSync('./userdb.json', JSON.stringify(alluser));

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Data created");
        res.end();
  
    },
    readUsers(req, res) {

    },

    readUserById(req, res){


    },
    updateUserById(req, res){

    },
    deleteUserById(req, res){
        
    }

}