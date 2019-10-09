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
            res.send(error);
            console.error(error);
        }
    )
});

router.post('/login', (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        let user = req.body;

        User.loginUser(user).then(
            (success) => {
                res.send(success);
            },
            (error) => {
                res.send(error);
            }
        )
    } catch (error) {

    }
});

router.post('/menus', (req, res, next) => {
    try {
        let id = req.body && req.body.userId ? req.body.userId : null;
        console.log(id);
        if (id) {
            User.getMenus(id)
                .then(
                    (success) => {
                        res.send(success);
                    },
                    (error) => {
                        res.send(error);
                    }
                );
        } else {
            res.send(new response("Plase provide user's id", null, httpResponseCodes.error));
        }
    } catch (error) {
        res.send(error);
    }
});

router.get('/settings/:settingtype', (req, res, next) => {
    try {
        let id = req.params.settingtype && req.params.settingtype ? req.params.settingtype : null;
        console.log(id);
        if (id) {
            User.getSettings(id)
                .then(
                    (success) => {
                        res.send(success);
                    },
                    (error) => {
                        res.send(error);
                    }
                );
        } else {
            res.send(new response("Plase provide user's id", null, httpResponseCodes.error));
        }
    } catch (error) {
        res.send(error);
    }
})


module.exports = router;