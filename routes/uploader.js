var express = require('express');
var uploader = require('../public/javascripts/uploader/uploader');
var httpResponseCodes = require('../public/javascripts/lib');
var router = express.Router();
var multer = require('multer');
var response = require("../public/javascripts/HttpResponse/response");
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

//var upload = multer({ storage: storage });
//const uri = "mongodb+srv://esachin:@sachin@@cluster0-fqmpm.mongodb.net/test?retryWrites=true&w=majority";

/* GET users listing. */

let getUploadsDetails = function(userid, type, iCallback) {
    try {
        var DIR = './uploads/' + userid + "/" + type;
        var upload = multer({ dest: DIR }).single('files');

        if (iCallback && typeof iCallback == 'function')
            iCallback(upload);
    } catch (error) {

    }
}

router.post('/:userid/:type', (req, res, next) => {
    try {
        uploader.upload(req.params.userid, req.params.type, req)
            .then(
                (upload) => {
                    upload(req, res, (err) => {
                        if (err)
                            res.send(new response("error", err, httpResponseCodes.error));
                        else {
                            res.json(new response("Upload Completed", req.files, httpResponseCodes.success));
                        }
                    });
                },
                (error) => {
                    res.send(new response("error", error, httpResponseCodes.error));
                }
            );
    } catch (error) {
        res.send(new response("error", error, httpResponseCodes.error));
    }
})


module.exports = router;