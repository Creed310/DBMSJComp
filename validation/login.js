//similar to register.js

const Validator = require("validator");
const isEmpty = require("is-empty");

//module.exports - to validate the login input data, returns errors and validity.

module.exports = validateLoginInput = (data) =>
{
  let errors = {};
  const MNRegex = /^[0]?[789]\d{9}$/;

// Convert empty fields to an empty string so we can use validator functions
  data.MobileNumber = !isEmpty(data.MobileNumber) ? data.MobileNumber : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";

// Mobile Number checks

  if (Validator.isEmpty(data.MobileNumber)) 
  {
    errors.MobileNumber = "Mobile Number field is required";
  } 
  else if (!MNRegex.test(data.MobileNumber))  //FLAG
  {
    errors.MobileNumber = "Mobile Number is invalid";
  }
// Password checks

  if (Validator.isEmpty(data.Password)) 
  {
    errors.Password = "Password field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};