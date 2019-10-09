let MongoClient = require('mongodb').MongoClient
var response = require("../HttpResponse/response");
var httpResponseCodes = require('../lib');
const uri = "mongodb://localhost:27017/billingsolutions";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let category;
client.connect(function(err, db) {
    if (err) throw err
    category = client.db("billingsolutions").collection('tblcategory');
    client.close();
})
let Category = (function(iUserObj) {

    /**
     * @author SSW
     * @description this function is used for updating categories
     */
    let updateCategory = function(iCategory) {
        try {
            return new Promise((resolve, reject) => {
                try {
                    console.log(JSON.stringify(iCategory))
                    category.insertOne(iCategory)
                        .then(
                            (res) => {
                                resolve(new response('success', res, httpResponseCodes.success))
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

    /**
     * @author SSW
     * @description this function is used for filtering childs
     * @param {*} obj 
     * @param {*} iArr 
     */
    let filterChilds = function(obj, iArr) {
        try {
            let index = iArr.findIndex((x) => x.parentId == obj._id);
            while (index >= 0) {
                if (!obj['childs'])
                    obj['childs'] = [];

                iArr[index] = filterChilds(iArr[index], iArr);
                obj['childs'].push(iArr[index]);

                iArr.splice(index, 1);
                index = iArr.findIndex((x) => x.parentId == obj._id);
            };
            return obj;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for for creating Tree structure
     * @param {*} iArr 
     */
    let createTreeStructure = function(iArr) {
        try {
            for (let i = 0; i < iArr.length > 0; i++) {
                iArr[i] = filterChilds(iArr[i], iArr);
            }
            return iArr;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for getting categories
     */
    let getCategories = function() {
        try {
            return new Promise((resolve, reject) => {
                try {
                    category.find().toArray()
                        .then(
                            (success) => {
                                resolve(new response('Success', createTreeStructure(success), httpResponseCodes.success));
                            },
                            (error) => {
                                reject(new response('error', null, httpResponseCodes.error));
                                console.error(error);
                            }
                        )
                } catch (error) {
                    reject(new response('error', null, httpResponseCodes.error));
                }
            });
        } catch (error) {
            reject(new response('error', null, httpResponseCodes.error));
        }
    }

    /**
     * @author SSW
     * @description this function is used for getting child categories
     */
    let getChildCategories = function() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for
     */
    let addChildCategory = function() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    let deleteCategory = function(iCategory) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    return {
        updateCategory,
        getCategories,
        getChildCategories,
        addChildCategory,
        deleteCategory
    };
})();

module.exports = Category;