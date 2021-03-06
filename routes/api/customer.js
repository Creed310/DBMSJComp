const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const path = require('path');

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Loading models

const Account = require("../../models/Account")
const Customer = require("../../models/Customer")
const Transaction = require("../../models/Transaction")
const Loan = require("../../models/Loan")
const Branch = require("../../models/Branch");

//REGISTER ROUTE

router.post("/register", (req, res) => {
    
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation, return errors if not valid. 
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    //MongoDB's findOne function returns a document.
    //Searches for email in the document which is the same as the email in the POST request.
    //if true, then returns that the email already exists.
    //if false, then creates a new user in the DB.
    
    

    Customer.findOne({ MobileNumber: req.body.MobileNumber }).then(customer => {
      if (customer) 
      {
        return res.status(400).json({ MobileNumber: "Mobile Number already exists" });
      } 
      else 
      {

            const newCustomer = new Customer(
        {
           
            MobileNumber: req.body.MobileNumber,
            CustomerID: req.body.CustomerID,
            Password: req.body.Password,
            Password2: req.body.Password2,
            C_First_Name: req.body.C_First_Name,
            C_Middle_Name: req.body.C_Middle_Name,
            C_Last_Name: req.body.C_Last_Name,
            Aadhar_Number: req.body.Aadhar_Number,
            Occupation: req.body.Occupation,
            City: req.body.City,
            DoB: req.body.DoB
        });
    
        // Hash password before saving in database
        // .save() saves the document to the database
        // res.json() sends a JSON response. 

            bcrypt.genSalt(10, (err, salt) => 
            {
            bcrypt.hash(newCustomer.Password, salt, (err, hash) => 
            {
                if (err) throw err;
                newCustomer.Password = hash;
                newCustomer.save().then((customer) => 
                {
                    res.sendFile('/views2/login.html', {root: '/Users/varun/JComp/DBMS'})
                }).catch((err) => 
                {
                    console.log(err)
                });
            });
        });
      }
    });
  });

//LOGIN ROUTE

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public 

router.post("/login", (req, res) => {
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const MobileNumber = req.body.MobileNumber;
    const Password = req.body.Password;
    
    // Find user by email
    Customer.findOne({ MobileNumber }).then(customer => 
        {
      // Check if user exists
      if (!customer) 
      {
        return res.status(404).json({ mobilenumbernotfound: "Mobile Number not found" });
      }
    // Check password

    //FLAGG
      bcrypt.compare(Password, customer.Password).then(isMatch => 
        {
        if (isMatch) 
        {
          // User matched
          // Create JWT Payload
          const payload = 
          {
            id: customer.id,
            MobileNumber: customer.MobileNumber
          };
          
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => 
            {
              res.sendFile('/views2/customer.html', {root: '/Users/varun/JComp/DBMS'})
            }
          );
        } 
        else 
        {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

//to view all customers 

  router.get("/view", async (req, res) => {
    try {
      const customer = await Customer.find();
      res.json(customer)
    } catch (e) {
      console.log(e);
      res.status(500).json();
    }
  });

  //to view all customers 

router.get("/view/:mobilenumber", async (req, res) => {
  try {
    const data = await Customer.findById(req.params.mobilenumber);
    if(data)
    {
      res.send(data)
    }
  }
    catch (e) 
    {
    console.log(e);
    res.status(500).json();
  }
});

router.get('/view/:mobile_number/allaccounts', async (req, res) =>
{
  let error = {}

    const mobile_number = req.params.mobile_number;
    const mobno = await Customer.findOne({ MobileNumber: mobile_number})
    if(!mobno)
    { 
      res.json({error_mobno: "No customer exists with that mobile number."})
    }

    const CustomerJSON = await mobno.toObject()
    const CustomerJSONCustID = await CustomerJSON.CustomerID

    const acc = await Account.find({ CustomerID: CustomerJSONCustID});

    if(!acc)
    {
      res.json({error_account: "No accounts exist for that Customer ID."})
    }
    
    res.send(acc);
})


router.post('/updatecustomer', async (req, res) =>
{
  let error = {}

    const Mobile_Number = req.body.MobileNumber
    const C_First_Name = req.body.C_First_Name
    const C_Middle_Name = req.body.C_Middle_Name
    const C_Last_Name = req.body.C_Last_Name
    const Occupation = req.body.Occupation
    const City = req.body.City
    
    const Cus = await Customer.findOne({ MobileNumber: Mobile_Number})
    if(!Cus)
    { 
      res.json({error_account: "No customer exists with that mobile number."})
    }

    const CusUpdated = await Customer.findOneAndUpdate({ MobileNumber: Mobile_Number}, 
      {
        C_First_Name: C_First_Name,
        C_Middle_Name: C_Middle_Name,
        C_Last_Name: C_Last_Name,
        Occupation: Occupation,
        City: City
      })

      res.json({message: "Customer Updation Successful"});
})

router.post('/deletecustomer', async (req, res) =>
{
  let error = {}

    const mobile_number = req.body.Mobile_Number;
  
    const Cus = await Customer.findOne({ MobileNumber: mobile_number})

    if(!Cus)
    { 
      res.json({error_customer: "No customer exists with that mobile number."})
    }

    const CusJSON = await Cus.toObject();
    const CusJSONCustomerID = await CusJSON.CustomerID

    const AccountDel = await Account.findOneAndDelete({ MobileNumber: mobile_number})
    const CustomerDel = await Customer.deleteMany({ CustomerID: CusJSONCustomerID})

    res.json({message: "Customer and subsequent Accounts deletion successful"});
})


  module.exports = router;