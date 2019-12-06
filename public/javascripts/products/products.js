var Model = require('./schemas');
var StoreDB = require("../db");
var response = require("../HttpResponse/response");
var httpResponseCodes = require('../lib');
var ObjectId = require('mongodb').ObjectId
let products, imagesdb, categorydb;
StoreDB.connect().then(
    (db) => {
        products = db.collection('tblproducts');
        imagesdb = db.collection('tblImages');
        categorydb = db.collection('tblProductCategory');
    },
    (error) => {
        throw error;
    }
);

let prds = (function () {
    let updateProduct = function (iProduct) {
        try {
            console.log(products);
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


    let product_details = function (param) {
        try {
            return new Promise((resolve, reject) => {
                products.aggregate([
                    { $match: { "_id": ObjectId(param.id) } },
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
                            console.log(success)
                            resolve(new response("success", success, httpResponseCodes.success));
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
                    console.log("fetching  products for --", param.userId);
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
                                console.log(success)
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
        saveCategories,
        product_details
    }
})();
module.exports = prds;