var express = require('express');
var categories = require('../public/javascripts/category/category');
var router = express.Router();

//const uri = "mongodb+srv://esachin:@sachin@@cluster0-fqmpm.mongodb.net/test?retryWrites=true&w=majority";

/* GET users listing. */
router.get('/', (req, res, next) => {
    try {
        categories.getCategories().then(
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
})

router.post('/add', (req, res, next) => {
    //console.log(JSON.stringify(req.body));
    let category = req.body;

    categories.updateCategory(category).then(
        (success) => {
            res.send(success);
        },
        (error) => {
            res.send(error);
            console.error(error);
        }
    )
});

router.post('/delete', (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        let category = req.body;

        categories.deleteCategory(category).then(
            (success) => {
                res.send(success);
            },
            (error) => {
                res.send(error);
            }
        )
    } catch (error) {

    }
})

module.exports = router;