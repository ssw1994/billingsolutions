var express = require('express');
var User = require('../public/javascripts/users/user');
var router = express.Router();

//const uri = "mongodb+srv://esachin:@sachin@@cluster0-fqmpm.mongodb.net/test?retryWrites=true&w=majority";

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    let user = req.body;

    User.registerUser(user).then(
        (success) => {
            res.send(success);
        },
        (error) => {
            console.error(error);
        }
    )
});

module.exports = router;