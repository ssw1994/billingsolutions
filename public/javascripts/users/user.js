let MongoClient = require('mongodb').MongoClient
var response = require("../HttpResponse/response");
let User = require('./model');
const uri = "mongodb://localhost:27017/billingsolutions";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let users;
client.connect(function(err, db) {
    if (err) throw err
    users = client.db("billingsolutions").collection('users');
    client.close();
})
let user = (function() {

    let loginUser = function(iUserObj) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    let registerUser = function(iUserObj) {
        try {
            return new Promise((resolve, reject) => {
                userobj = null;
                if (iUserObj) {
                    userobj = new User(iUserObj);
                    console.log('register', userobj);
                } else {
                    resolve(new response('failure', { data: [] }, "400"));
                }
                users.insertOne(userobj).then(
                    (success) => {
                        resolve(new response('success', success, "200"));
                    },
                    (error) => {
                        reject(new response("failure", error, "400"));
                    }
                )
            })
        } catch (error) {
            console.error(error);
        }
    }

    return {
        registerUser,
        loginUser
    };
})();

module.exports = user;