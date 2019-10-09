let MongoClient = require('mongodb').MongoClient
var response = require("../HttpResponse/response");
var httpResponseCodes = require('../lib');
const uri = "mongodb://localhost:27017/billingsolutions";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let uploader;
var multer = require('multer');
client.connect(function(err, db) {
    if (err) throw err
    uploader = client.db("billingsolutions").collection('tblcategory');
    client.close();
})

let Uploader = (function() {

    let upload = function(userid, type) {
        try {
            console.log(userid, type)
            return new Promise((resolve, reject) => {
                let dir = "./uploads/images/" + type.toLowerCase() + "/" + userid;
                switch (type.toLowerCase()) {
                    case 'profile':
                        resolve(multer({ dest: dir }).single('files'));
                        break;
                    case 'product':
                        resolve(multer({ dest: dir }).array('files', 12));
                        break;
                }
            })
        } catch (error) {
            reject(new response("error", error, httpResponseCodes.error))
        }
    }
    return {
        upload
    };
})();

module.exports = Uploader;