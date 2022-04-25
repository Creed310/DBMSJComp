const express = require("express");
const router = express.Router();


// Load input validation

const validateRegisterAccountInput = require("../../validation/account_register");

// Loading models

const Account = require("../../models/Account")
const Customer = require("../../models/Customer")

//REGISTER ROUTE

router.post("/register", (req, res) => {
    
  // Form validation
  const { errors, isValid } = validateRegisterAccountInput(req.body);
  console.log("working!!")
  
  // Check validation, return errors if not valid. 
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    //MongoDB's findOne function returns a document.
    //Searches for email in the document which is the same as the email in the POST request.
    //if true, then returns that the email already exists.
    //if false, then creates a new user in the DB.
    Customer.findOne({ CustomerID: req.body.CustomerID}).then(customer => {
      if (customer)
      {
        return res.status(400).json({ CustomerID: "CustomerID has already been taken by another customer."})
      }
    })

    Account.findOne({ Account_Number: req.body.Account_Number }).then(account => {
      if (account) 
      {
        return res.status(400).json({ Account_Number: "Account Number already exists" });
      } 
      else 
      {

            let newAccount = new Account({
            Account_Number: req.body.Account_Number,
            Account_Type: req.body.Account_Type,
            CustomerID: req.body.CustomerID,
            AoD: req.body.AoD,
            BranchID: req.body.BranchID,
            Balance: req.body.Balance,
            PIN_Number: req.body.PIN_Number
        });

        newAccount.save().then(() => {
          res.send(200).json({
            message: "Account Created"
          });
        });
        
      }
    });
  });

//LOGIN ROUTE

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public 

  module.exports = router;