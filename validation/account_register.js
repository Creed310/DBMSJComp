//similar to login.js

const Validator = require('validator')
const isEmpty = require('is-empty')

// module.exports returns the errors, isvalid boolean

module.exports = validateAccountRegisterInput = (data) =>
{
    let errors = {}
    const INDBARegex = /[0-9]{9,18}/;
    const CIDRegex = /^CUS000([0-9][0-9])$/;
    const BIDRegex = /^BR000([0-9][0-9])$/;

    // convert empty FIELDS to empty STRINGS so that can use Validator functions

    // expression ? True : False

    //Password2 = confirmpassword.

    // Account_Number:
    // {
    //     type: String,
    //     required: true
    // },
    // Account_Type:
    // {
    //     type: Date,
    //     required: true
    // },
    // CustomerID:
    // {
    //     type: Number,
    //     required: true
    // },
    // AoD:
    // {
    //     type: Date,
    //     default: Date.now,
    //     required: true
    // },
    // BranchID:
    // {
    //     type: String,
    //     required: true
    // },
    // Balance:
    // {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    // PIN_Number:
    // {
    //     type: Number,
    //     required: true
    //     //Assigned by System.
    // }

    //for login, need MobileNumber, Password, Password2
    //for Register, need all else
    data.Account_Number = !isEmpty(data.Account_Number) ? data.Account_Number : "";
    data.Account_Type = !isEmpty(data.Account_Type) ? data.Account_Type : "";
    data.CustomerID = !isEmpty(data.CustomerID) ? data.CustomerID : "";
    data.AoD = !isEmpty(data.AoD) ? data.AoD : "";
    data.BranchID = !isEmpty(data.BranchID) ? data.BranchID : "";
    data.Balance = !isEmpty(data.Balance) ? data.Balance : "";
    data.PIN_Number = !isEmpty(data.PIN_Number) ? data.PIN_Number : "";

    // Now can use Validator functions.

    // Name checks

    // Email checks
    if (Validator.isEmpty(data.Account_Number)) 
    {
        errors.Account_Number = "Account Number is required";
    } 
    else if (!INDBARegex.test(data.Account_Number)) 
    {
        errors.Account_Number = "Account Number is invalid (Not a valid Indian Bank Account)";
    }

    if (Validator.isEmpty(data.Account_Type)) 
    {
        errors.Account_Type = "Account Type is required";
    } 
    else if (!(data.Account_Type.toLowerCase() == "savings" || data.Account_Type.toLowerCase() == "current")) 
    {
        errors.MobileNumber = "Account Type is invalid.";
    }

    if (Validator.isEmpty(data.CustomerID)) 
    {
        errors.CustomerID = "CustomerID field is required";
    } 
    else if (!CIDRegex.test(data.CustomerID)) 
    {
        errors.CustomerID = "CustomerID is invalid";
    }

    if (Validator.isEmpty(data.AoD)) 
    {
        errors.AoD = "Account Opening Date field is required";
    } 
    else if (!Validator.isDate(data.AoD)) 
    {
        errors.AoD = "Account Opening Date is invalid";
    }

    if (Validator.isEmpty(data.BranchID)) 
    {
        errors.BranchID = "BranchID field is required";
    } 
    else if (!BIDRegex.test(data.BranchID)) 
    {
        errors.BranchID = "BranchID is invalid";
    }

    if (Validator.isEmpty(data.Balance)) 
    {
        errors.Balance = "Opening Balance is required";
    } 
    
    // if (Validator.isEmpty(data.BranchID)) 
    // {
    //     errors.BranchID = "BranchID field is required";
    // } 
    // else if (!BIDRegex.test(data.BranchID)) 
    // {
    //     errors.BranchID = "BranchID is invalid";
    // }
    

    return {
        errors,                   //the errors object with all the errors.password, errors.password2 is returned.
        isValid: isEmpty(errors)  //a bool that returns 1 if everything is valid.
    }
}

