var express = require('express');
var products = require('../public/javascripts/products/products');
var router = express.Router();
//const uri = "mongodb+srv://esachin:@sachin@@cluster0-fqmpm.mongodb.net/test?retryWrites=true&w=majority";

/* GET users listing. */
router.post('/', function (req, res, next) {
    products.getProducts(req.body).then(
        (success) => {
            res.send(success);
        },
        (error) => {
            res.send(error);
        }
    )
});

router.post("/details",function(req,res,next){
    products.product_details(req.body).then(
        (success)=>{
            res.send(success);
        },
        (error)=>{
            console.error(error);
        }
    )
})

router.post('/saveupdate', function (req, res, next) {
    try {
        products.updateProduct(req.body).then(
            (success) => {
                res.send(success);
            },
            (error) => {
                res.send(error);
            }
        )
    } catch (error) {
        console.error(error);
    }
});

router.post('/saveimages', function (req, res, next) {
    products.saveImages(req.body).then(
        (success) => {
            res.send(success)
        },
        (error) => {
            res.send(error)
        }
    )
})

router.post('/savecategories', function (req, res, next) {
    products.saveCategories(req.body).then(
        (success) => {
            res.send(success);
        },
        (error) => {
            res.send(error);
        }
    )
})

module.exports = router;