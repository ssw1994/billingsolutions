var response = require("../HttpResponse/response");
var StoreDB = require("../db");
var httpResponseCodes = require('../lib');
var ObjectId = require('mongodb').ObjectId
let User = require('./model');
let users, menus, settings;
StoreDB.connect().then(
    (db) => {
        users = db.collection('users');
        menus = db.collection('tblmenus');
        settings = db.collection('tblsettings');
    },
    (error) => {
        throw error;
    }
)
// client.connect(function(err, db) {
//     if (err) throw err
//     users = client.db("billingsolutions").collection('users');
//     menus = client.db("billingsolutions").collection('tblmenus');
//     settings = client.db("billingsolutions").collection('tblsettings');
//     client.close();
// })
let user = (function (iUserObj) {

    let loginUser = function (iUserObj) {
        try {
            return new Promise((resolve, reject) => {
                if (iUserObj) {
                    console.log("Verfy", JSON.stringify(iUserObj));
                    if (iUserObj.hasOwnProperty('username') && iUserObj.hasOwnProperty('password')) {
                        users.find({
                            $and: [
                                { "username": iUserObj.username },
                                { "password": iUserObj.password }
                            ]
                        }).toArray()
                            .then(
                                (res) => {
                                    //console.log(res);
                                    if (res.length > 0) {
                                        resolve(new response("Details Verified", res, httpResponseCodes.success));
                                    } else {
                                        users.find({ username: iUserObj.username }).toArray()
                                            .then(
                                                (usernamefound) => {
                                                    resolve(new response('Incorrect Password', null, httpResponseCodes.error));
                                                },
                                                (usernameerror) => {
                                                    resolve(new response("User not found", res, httpResponseCodes.not_found));
                                                }
                                            )
                                    }
                                },
                                (error) => {
                                    reject(new response("Error in Verification", error, httpResponseCodes.error));
                                    console.log(error);
                                }
                            );
                        //resolve(new response("Details Verified", resultset, "200"));
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    let registerUser = function (iUserObj) {
        try {
            return new Promise((resolve, reject) => {
                userobj = null;
                if (iUserObj) {
                    userobj = new User(iUserObj);
                    console.log('register', iUserObj);
                    users.find({ username: iUserObj.username }).toArray()
                        .then(
                            (userList) => {
                                console.log(userList)
                                if (userList && userList.length > 0) {
                                    reject(new response("Username already exits", { data: null }, httpResponseCodes.duplicate));
                                } else {
                                    users.find({ email: iUserObj.email }).toArray().then(
                                        (emailsuccess) => {
                                            if (emailsuccess && emailsuccess.length > 0) {
                                                reject(new response("Email Already Exist", emailsuccess, httpResponseCodes.duplicate))
                                            } else {
                                                users.insertOne(userobj).then(
                                                    (success) => {
                                                        resolve(new response('success', success, httpResponseCodes.success));
                                                    },
                                                    (error) => {
                                                        reject(new response("failure", error, httpResponseCodes.error));
                                                    }
                                                );
                                            }

                                        },
                                        (emailfailure) => {
                                            reject(new response("Error in email Verfication", null, httpResponseCodes.error));
                                        }
                                    )

                                }
                            },
                            (errorList) => {
                                console.log(errorList);
                            }
                        );
                } else {
                    resolve(new response('failure', { data: [] }, httpResponseCodes.error));
                }
            });
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * @author SSW
     * @description this function is used for getting user details by id
     * @param {*} userid 
     */
    let getUserDetails = function (userid) {
        try {
            return new Promise((resolve, reject) => {
                try {
                    let u_id = new ObjectId(userid);
                    users.find({ _id: u_id }).toArray()
                        .then(
                            (success) => {
                                resolve(new response("success", success, httpResponseCodes.success));
                            },
                            (error) => {
                                reject(new response('error', error, httpResponseCodes.error))
                            }
                        );
                } catch (error) {
                    reject(new response('error', error, httpResponseCodes.error))
                }

            })
        } catch (error) {
            console.error(error);
        }
    }

    let getMenus = function (userId) {
        try {
            return new Promise((resolve, reject) => {
                getUserDetails(userId).then(
                    (success) => {
                        if (success.errorCode == httpResponseCodes.success) {
                            if (success.data && success.data instanceof Array && success.data.length > 0) {
                                let currentuser = success.data[0];
                                console.log(currentuser);
                                menus.find()
                                    .toArray().then(
                                        (menus) => {
                                            if (menus && menus instanceof Array) {
                                                if (!currentuser.premium) {
                                                    menus = menus.filter((x) => !x.premium)
                                                }
                                            }
                                            resolve(new response("success", menus, httpResponseCodes.success))
                                        },
                                        (errors) => {
                                            reject(new response("error", errors, httpResponseCodes.error))
                                        }
                                    );
                            }
                        }
                    }, (error) => {
                        reject(new response("error", error, httpResponseCodes.error))
                    }
                );
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for getting settings
     * @param {*} iSettingType 
     */
    let getSettings = function (iSettingType) {
        try {
            return new Promise((resolve, reject) => {
                settings.find()
                    .toArray().then(
                        (res) => {
                            let usersettings = res.filter((x) => x.settingtype == iSettingType);
                            resolve(new response("success", usersettings, httpResponseCodes.success));
                        },
                        (error) => {
                            reject(new response("error", error, httpResponseCodes.error))
                        }
                    );
            });
        } catch (error) {
            reject(new response("error", error, httpResponseCodes.error))
        }
    }

    return {
        registerUser,
        loginUser,
        getMenus,
        getSettings
    };
})();

module.exports = user;