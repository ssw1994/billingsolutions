MOBILE_PATTERN = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
let UserSchema = {
    username: (value) => {
        return isNaN(value) && value != "" && value != null && value != undefined;
    },
    password: (value) => {
        return PASSWORD_PATTERN.test(value);
    },
    email: (value) => {
        return EMAIL_PATTERN.test(value);
    },
    mobile: (value) => {
        return MOBILE_PATTERN.test(value);
    },
    active: (value) => {
        return typeof value == "boolean" || !isNaN(value);
    },
    premium: (value) => {
        return typeof value == 'boolean' || !isNaN(value);
    }
}

/**
 * @author SSW
 * @param  schema 
 * @param object 
 * @description this function is used for validating user object
 */
function validator(schema, object) {
    try {
        return new Promise((resolve, reject) => {
            var errors = Object.keys(schema).map(function(property) {
                var validator = schema[property];
                return [property, validator(object[property])];
            }).reduce(function(errors, pair) {
                if (pair[1] === false) {
                    errors.push(new Error(pair[0] + " is invalid."));
                }
                return errors;
            }, []);

            if (errors.length > 0) {
                errors.forEach(function(error) {
                    reject(error)
                });
            } else {
                resolve(true);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

class User {
    constructor(iUserObj) {
        try {
            validator(UserSchema, iUserObj).then(
                (success) => {
                    this.username = iUserObj.username;
                    this.password = iUserObj.password;
                    this.email = iUserObj.email;
                    this.active = iUserObj.active;
                    this.premium = iUserObj.premium;
                    this.mobile = iUserObj.mobile;
                },
                (failure) => {
                    console.log("fail", failure);
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    getInstance(iUserObj) {

    }
}

module.exports = User;