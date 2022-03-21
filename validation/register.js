//similar to login.js

const Validator = require('validator')
const isEmpty = require('is-empty')

// module.exports returns the errors, isvalid boolean

module.exports = function validateRegisterInput(data)
{
    let errors = {}

    // convert empty FIELDS to empty STRINGS so that can use Validator functions

    // expression ? True : False

    //Password2 = confirmpassword.

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Now can use Validator functions.

    // Name checks
    if (Validator.isEmpty(data.name)) 
    {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) 
    {
        errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) 
    {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) 
    {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) 
    {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) 
    {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) 
    {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,                   //the errors object with all the errors.password, errors.password2 is returned.
        isValid: isEmpty(errors)  //a bool that returns 1 if everything is valid.
    }
}

