var mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient
var uri = "mongodb://localhost:27017/billingsolutions";
var Model = require('./schemas');
var response = require("../HttpResponse/response");
var httpResponseCodes = require('../lib');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err, db) {
    if (err) throw err
    products = client.db("billingsolutions").collection('tblproducts');
    imagesdb = client.db("billingsolutions").collection('tblImages');
    categorydb = client.db("billingsolutions").collection('tblProductCategory');
    client.close();
})
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', (error) => {
    console.error(error)
});
db.once('open', () => {

});


let prds = (function () {
    let updateProduct = function (iProduct) {
        try {
            return new Promise((resolve, reject) => {
                products.insertOne(iProduct).then(
                    (success) => {
                        resolve(new response("Success", success, httpResponseCodes.success))
                    },
                    (error) => {
                        reject(new response("error", error, httpResponseCodes.error))
                    }
                )
                // let product = new Model.proudct(iProduct);
                // product.save((error,product)=>{
                //     if(error)
                //         reject(new response("error", error, httpResponseCodes.error));
                //     resolve("success", product, httpResponseCodes.success)
                // });
            });
        } catch (error) {
            console.error(error);
        }
    };

    let saveImages = function (images) {
        try {
            return new Promise((resolve, reject) => {
                imagesdb.insertMany(images)
                    .then(
                        (success) => {
                            resolve(new response("success", success, httpResponseCodes.success));
                        },
                        (error) => {
                            reject(new response("error", error, httpResponseCodes.error));
                        }
                    );
            })
        } catch (error) {
            console.error(error);
        }
    }

    function getImages(product) {
        try {
            console.log(product)
            return new Promise((resolve, reject) => {
                imagesdb.find({ productId: product._id }).toArray()
                    .then(
                        (images) => {
                            resolve(images)
                        },
                        (error) => {
                            resolve([]);
                        }
                    );
            })
        } catch (error) {
            console.error(error);
        }
    }

    let getProducts = function (param) {
        try {
            return new Promise((resolve, reject) => {
                if (param.userId) {
                    console.log("Here is UserId---->", param.userId);
                    products.aggregate([
                        { $match: { "createdBy": param.userId } },
                        {
                            "$addFields": {
                                "productId": { "$toString": "$_id" }
                            }
                        },
                        {
                            $lookup: {
                                from: 'tblImages',
                                localField: 'productId',
                                foreignField: 'productId',
                                as: 'images'
                            }
                        }]).toArray().then(
                            (success) => {
                                resolve(new response("success", success, httpResponseCodes.success));
                            },
                            (error) => {
                                reject(new response("error", error, httpResponseCodes.error))
                            }
                        );
                } else {
                    products.aggregate([
                        {
                            "$addFields": {
                                "productId": { "$toString": "$_id" }
                            }
                        },
                        {
                            $lookup: {
                                from: 'tblImages',
                                localField: 'productId',
                                foreignField: 'productId',
                                as: 'images'
                            }
                        }]).toArray().then(
                            (success) => {
                                resolve(new response("success", success, httpResponseCodes.success));
                            },
                            (error) => {
                                reject(new response("error", error, httpResponseCodes.error))
                            }
                        )
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for saving category
     * @param {*} category 
     */
    let saveCategories = function (category) {
        try {
            return new Promise((resolve, reject) => {
                categorydb.insertMany(category).then(
                    (success) => {
                        resolve(new response("success", success, httpResponseCodes.success))
                    },
                    (error) => {
                        reject(new response("error", error, httpResponseCodes.error))
                    }
                )
            });
        } catch (error) {
            console.error(error);
        }
    }

    return {
        updateProduct,
        saveImages,
        getProducts,
        saveCategories
    }
})();
module.exports = prds;