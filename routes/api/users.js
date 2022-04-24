const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Loading models

const User = require("../../models/User")
const Account = require("../../models/Account")
const Customer = require("../../models/Customer")
const Transaction = require("../../models/Transaction")
const Loan = require("../../models/Loan")
const Branch = require("../../models/Branch")

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

    User.findOne({ email: req.body.email }).then(user => {
      if (user) 
      {
        return res.status(400).json({ email: "Email already exists" });
      } 
      else 
      {
            const newUser = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        // Hash password before saving in database
        // .save() saves the document to the database
        // res.json() sends a JSON response. 

            bcrypt.genSalt(10, (err, salt) => 
            {
            bcrypt.hash(newUser.password, salt, (err, hash) => 
            {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
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

    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) 
      {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
    // Check password
      bcrypt.compare(password, user.password).then(isMatch => 
        {
        if (isMatch) 
        {
          // User matched
          // Create JWT Payload
          const payload = 
          {
            id: user.id,
            name: user.name
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
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else 
        {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  module.exports = router;