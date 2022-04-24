//similar to login.js

const Validator = require('validator')
const isEmpty = require('is-empty')

// module.exports returns the errors, isvalid boolean

module.exports = validateRegisterInput = (data) =>
{
    let errors = {}
    const MNRegex = /^[0]?[789]\d{9}$/;
    const ANRegex = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

    // convert empty FIELDS to empty STRINGS so that can use Validator functions

    // expression ? True : False

    //Password2 = confirmpassword.

    // MobileNumber: req.body.MobileNumber,
    //         Password: req.body.Password,
    //         C_First_Name: req.body.C_First_Name,
    //         C_Middle_Name: req.body.C_First_Name,
    //         C_Last_Name: req.body.C_Last_Name,
    //         Aadhar_Number: req.body.Aadhar_Number,
    //         Occupation: req.body.Occupation,
    //         City: req.body.City,
    //         DoB: req.body.DoB

    //for login, need MobileNumber, Password, Password2
    //for Register, need all else
    data.MobileNumber = !isEmpty(data.MobileNumber) ? data.MobileNumber : "";
    data.Password = !isEmpty(data.Password) ? data.Password : "";
    data.Password2 = !isEmpty(data.Password2) ? data.Password2 : "";
    data.C_First_Name = !isEmpty(data.C_First_Name) ? data.C_First_Name : "";
    data.C_Middle_Name = !isEmpty(data.C_Middle_Name) ? data.C_Middle_Name : "";
    data.C_Last_Name = !isEmpty(data.C_Last_Name) ? data.C_Last_Name : "";
    data.Aadhar_Number = !isEmpty(data.Aadhar_Number) ? data.Aadhar_Number : "";
    data.Occupation = !isEmpty(data.Occupation) ? data.Occupation : "";
    data.City = !isEmpty(data.City) ? data.City : "";
    data.DoB = !isEmpty(data.DoB) ? data.DoB : "";
    
    // Now can use Validator functions.

    // Name checks

    // Email checks
    if (Validator.isEmpty(data.MobileNumber)) 
    {
        errors.MobileNumber = "Mobile Number field is required";
    } 
    else if (!MNRegex.test(data.MobileNumber)) 
    {
        errors.MobileNumber = "Mobile Number is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.Password)) 
    {
        errors.Password = "Password field is required";
    }

    if (Validator.isEmpty(data.Password2)) 
    {
        errors.Password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.Password, { min: 6, max: 30 })) 
    {
        errors.Password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.Password, data.Password2)) 
    {
        errors.Password2 = "Passwords must match";
    }

    //Aadhar Number Checks
    if (Validator.isEmpty(data.Aadhar_Number)) 
    {
        errors.Aadhar_Number = "Aadhar Number field is required";
    } 
    else if (!ANRegex.test(data.Aadhar_Number)) 
    {
        errors.Aadhar_Number = "Aadhar Number is invalid";
    }

    if (Validator.isEmpty(data.DoB)) 
    {
        errors.DoB = "DoB field is required";
    } 
    else if (!Validator.isDate(data.DoB)) 
    {
        errors.DoB = "DoB is invalid";
    }
    return {
        errors,                   //the errors object with all the errors.password, errors.password2 is returned.
        isValid: isEmpty(errors)  //a bool that returns 1 if everything is valid.
    }
}

