const Validator = require('validator')
const isEmpty = require('is-empty')

// This module is to validate and check the form/input data recieved from the Customer Creation
// portion of the application. 

// [Create a Customer] -> Mobile_Number is their identity first, then assigned a CustomerID by the back-end.
// [Sign-In] -> Mobile_Number/CustomerID and Password
// [Client] 

module.exports = validateCustomerInput = (data) =>
{
    let errors = {}

    //data.CustomerID = !isEmpty(data.CustomerID) ? data.CustomerID : ""  //assigned at random with prefix
    data.C_First_Name = !isEmpty(data.C_First_Name) ? data.C_First_Name : ""
    data.C_Middle_Name = !isEmpty(data.C_Middle_Name) ? data.C_Middle_Name : ""
    data.C_Last_Name = !isEmpty(data.C_Last_Name) ? data.C_Last_Name : ""
    data.Occupation = !isEmpty(data.Occupation) ? data.Occupation : ""
    data.Aadhar_Number = !isEmpty(data.Aadhar_Number) ? data.Occupation : ""
    data.City = !isEmpty(data.City) ? data.City : ""
    data.Mobile_Number = !isEmpty(data.Mobile_Number) ? data.Mobile_Number : ""
    data.DoB = !isEmpty(data.DoB) ? data.DoB : ""

    if (Validator.isEmpty(data.C_First_Name))
    {
        errors.C_First_Name = "Please enter your first name."
    }

    if (Validator.isEmpty(data.C_Last_Name))
    {
        errors.C_First_Name = "Please enter your last name."
    }

    if (Validator.isEmpty(data.Occupation))
    {
        errors.Occupation = "Please enter occupation."
    }

    if (Validator.isEmpty(data.Aadhar_Number) || !(Validator.isLength(data.Aadhar_Number, {min = 12, max = 12})))
    {
        errors.Aadhar_Number = "Please enter a valid Aadhar Number (for verification purposes)."
    }

    if (Validator.isEmpty(data.Mobile_Number) || !(Validator.isLength(data.Aadhar_Number, {min = 10, max = 10})))
    {
        errors.Mobile_Number = "Please enter a valid Mobile Number (for verification purposes)."
    }

    if (Validator.isEmpty(data.DoB))
    {
        errors.DoB = "Please enter your Date of Birth (for verification purposes)"
    }

    
    
}