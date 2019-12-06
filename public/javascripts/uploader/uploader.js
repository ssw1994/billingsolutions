var StoreDB = require("../db");
var response = require("../HttpResponse/response");
var httpResponseCodes = require('../lib');
const uri = "mongodb://localhost:27017/billingsolutions";
let uploader;
var multer = require('multer');
StoreDB.connect(
    (db) => {
        uploader = db.collection('tblcategory');
    },
    (error) => {
        throw error;
    }
);

let Uploader = (function () {

    let upload = function (userid, type) {
        try {
            console.log(userid, type)
            return new Promise((resolve, reject) => {
                let dir = "./public/images/uploads/" + type.toLowerCase() + "/" + userid;
                var storage = multer.diskStorage({
                    destination: dir,
                    filename: function (req, file, cb) {
                        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                        let name = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
                        name = name.split(' ').join('');
                        name = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        cb(null, Date.now() + "_" + name)
                    }
                })
                switch (type.toLowerCase()) {
                    case 'profile':
                        resolve(multer({ storage: storage }).array('files', 1));
                        //resolve(multer({ dest: dir }).array('files', 1));
                        break;
                    case 'product':
                        resolve(multer({ storage: storage }).array('files', 12));
                        //resolve(multer({ dest: dir }).array('files', 12));
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