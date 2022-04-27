const express = require("express");
const router = express.Router();
const Validator = require('validator')
const isEmpty = require("is-empty");
const Chart = require("chart.js")
const path = require('path');


//.toObject() converts mongoose document to javascript object
//.toNumber() is an abstract definition of an ECMA script, that's why it worked on the other project,
// it is not an built-in function

// Load input validation

const validateRegisterAccountInput = require("../../validation/account_register");

// Loading models

const Account = require("../../models/Account")
const Customer = require("../../models/Customer")
const Transaction  = require("../../models/Transaction");
const Loan  = require("../../models/Loan");
const Branch = require("../../models/Branch");

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
          res.json({
            message: "Account Created"
          });
        });
        
      }
    });
  });

router.get("/view/allaccounts", async (req, res) => {
    try {
      const account = await Account.find();
      res.send(account);
    } catch (e) {
      console.log(e);
      res.status(500).json({error: "No accounts"});
    }
  });

  router.get("/view/alltransactions", async (req, res) => {
    try {
      const transaction = await Transaction.find();
      res.send(transaction);
    } catch (e) {
      console.log(e);
      res.status(500).json({error: "No transactions"});
    }
  });

  router.get("/view/allloans", async (req, res) => {
    try {
      const loan = await Loan.find();
      res.send(loan);
    } catch (e) {
      console.log(e);
      res.status(500).json({error: "No loans"});
    }
  });

router.get("/view/:account_number", async (req, res) => 
  {
      const account_number = req.params.account_number;
      
      // Find user by email
      Account.findOne({ Account_Number: account_number }).then((account1) =>
      {
          if(account1)
          {
              res.send(account1)
          }
          else
          {
              res.json({error: "There exists no account with that account number"})
          }
      })
  });

router.post("/sendmoney", async (req, res) => 
{
  let error = {}
  try
  {
    const Amount = req.body.Amount
    const Sender_AN = req.body.Sender
    const Recipient_AN = req.body.Recipient


  const SenderMongo = await Account.findOne({ Account_Number: Sender_AN})
    if(!SenderMongo)
      {
        error.sender = "The sender's account does not exist."
      }
    
  const RecipientMongo= await Account.findOne({ Account_Number: Recipient_AN})
   if(!RecipientMongo)
   {
      error.recipient = "The recipient's account does not exist."
    }
    
  let AmountNum = Number(Amount)
    
    const SenderMongoJSON = SenderMongo.toObject()
    let SenderMongoJSONBalance = await Number(SenderMongoJSON.Balance)
    //let SenderMongoJSONBalanceNum = await Number(SenderMongoJSON.Balance)
    // let SenderMongoJSONBalanceNum = await SenderMongoJSONBalance.toNumber()

    const RecipientMongoJSON = RecipientMongo.toObject()
    let RecipientMongoJSONBalance = await Number(RecipientMongoJSON.Balance)
    //let RecipientMongoJSONBalanceNum = await Number(RecipientMongoJSON.Balance)
    // let RecipientMongoJSONBalanceNum = await RecipientMongoJSONBalance.toNumber()

    console.log(SenderMongoJSONBalance < AmountNum)


  if(SenderMongoJSONBalance < AmountNum)
    {
      error.balance = "Insufficient Balance"
    }

  if(SenderMongoJSONBalance >= AmountNum)
  {
      RecipientMongoJSONBalance = RecipientMongoJSONBalance + AmountNum
      SenderMongoJSONBalance = SenderMongoJSONBalance - AmountNum

      const SenderMongoUpdated = await Account.findOneAndUpdate({ Account_Number: Sender_AN}, {Balance: SenderMongoJSONBalance})
      const RecipientMongoUpdated = await Account.findOneAndUpdate({ Account_Number: Recipient_AN}, {Balance: RecipientMongoJSONBalance})

      const T_DoT = new Date(Date.now())

      let newTransaction = new Transaction({
        DoT: T_DoT,
        T_Amount: Amount,
        S_Account_Number: Sender_AN,
        R_Account_Number: Recipient_AN
      }).save()

      res.json({message: "Transaction Successful"});
    }

    
    // Account.findOne({ Account_Number: Sender_AN }).then((sender) =>
    // {
    //   if(sender)
    //   {
    //     return sender.toObject().Balance
    //   }
    //   else
    //   {
    //     res.json({error: "The Sender Account Number does not exist"})
    //   }
    // })

    // const RecipientMongoBalance = Account.findOne({ Account_Number: Recipient_AN }).then((reciever) =>
    // {
    //   if(reciever)
    //   {
    //     // console.log(reciever.toObject().Balance)
    //     return reciever
    //   }
    //   else
    //   {
    //     res.json({error: "The Reciever Account Number does not exist"})
    //   }
    // })

    // let SenderMongoObj = SenderMongo.toObject()
    // console.log(SenderMongoObj)
    }
  catch(e)
  {
    res.json(error);
  }
});

router.post('/applyloan', async (req, res) =>
{
  // LoanID:
  //       {
  //           type: String,
  //           required: true
  //       },
  //       BranchID:
  //       {
  //           type: String,
  //           required: true
  //       },
  //       DoL:
  //       {
  //           type: Date,
  //           required: true
  //       },
  //       L_Amount:
  //       {
  //           type: Number,
  //           required: true
  //       },
  //       Account_Number:
  //       {
  //           type: String,
  //           required: true
  //       },
  //       Loan_Interest:
  //       {
  //           type: Number,
  //           required: true
  //       }

  let error = {}

  try
  {
    const Amount = req.body.Amount
    const Applicant_AN = req.body.Applicant
    const BID = req.body.BranchID
    const Interest = req.body.Interest
  
    const ApplicantMongo = await Account.findOne({ Account_Number: Applicant_AN})
    if(!ApplicantMongo)
      {
        error.applicant = "The applicant's account does not exist."
      }
    
    const BranchMongo = await Branch.findOne({ BranchID: BID})
    if(!BranchMongo)
    {
        error.branch = "The branch does not exist."
    }
  
    let AmountNum = Number(Amount)
    let InterestNum = Number(Interest)
      
    const ApplicantMongoJSON = ApplicantMongo.toObject()
    const BranchMongoJSON = BranchMongo.toObject()
  
    let LoanChance = Math.random()<0.5?0:1
  
    console.log(LoanChance)
  
    if(LoanChance)
    {
      const L_DoT = new Date(Date.now())
  
      let newLoan = new Loan({
        BranchID: BID,
        DoL: L_DoT,
        L_Amount: AmountNum,
        Account_Number: Applicant_AN,
        Loan_Interest: InterestNum + "%"
      }).save()
      res.json({message: "Your loan has been granted."});
    }
  
    else if(!LoanChance)
    {
      res.json({error_loan: "Your loan has been denied."})
    }
  }

  catch(e)
  {
    res.json(error);
  }
    
  //console.log(Math.random()<0.5?0:1)
})

router.get('/view/:account_number/alltransactions', async (req, res) =>
{
  let error = {}

    const account_number = req.params.account_number;
    const Acc = await Account.findOne({ Account_Number: account_number})
    if(!Acc)
    { 
      res.json({error_account: "No account exists with that account number."})
    }
      const trans = await Transaction.find({ S_Account_Number: account_number});
    if(trans.length == 0)
    {
      res.json({error_trans: "No transactions exists from that account number."})
    }
    
    res.send(trans);
})

router.get('/view/:account_number/allloans', async (req, res) =>
{
  let error = {}

    const account_number = req.params.account_number;
    const Acc = await Account.findOne({ Account_Number: account_number})
    if(!Acc)
    { 
      res.json({error_account: "No account exists with that account number."})
    }
      const loans = await Loan.find({ Account_Number: account_number});
    if(loans.length == 0)
    {
      res.json({error_loans: "No loans exists from that account number."})
    }
    
    res.send(loans);
})

router.post('/updateaccount', async (req, res) =>
{
  let error = {}

    const n_account_type = req.body.Type
    const n_branch_id = req.body.BranchID
    const deposit = !isEmpty(req.body.deposit) ? (req.body.deposit) : "";
    const withdraw = !isEmpty(req.body.withdraw) ? (req.body.withdraw) : "";
    const account_number = req.body.Account_Number;

    const deposit_num = Number(deposit)
    const withdraw_num = Number(withdraw)
  
    const Acc = await Account.findOne({ Account_Number: account_number})
    if(!Acc)
    { 
      res.json({error_account: "No account exists with that account number."})
    }

    if(!Validator.isEmpty(deposit) && !Validator.isEmpty(withdraw))
    {
      res.json({error_amount: "Cannot withdraw and deposit money at the same time."})
    }

    if (!(n_account_type.toLowerCase() == "savings" || n_account_type.toLowerCase() == "current"))
    {
      res.json({error_type: "Invalid account type."})
    }

    const AccJSON = await Acc.toObject()

    let AccJSONBal = await Number(AccJSON.Balance)

    if(deposit_num>0)
    {
      AccJSONBal = AccJSONBal + deposit_num
    }

    if(withdraw_num>0)
    {
      AccJSONBal = AccJSONBal - withdraw_num
    }

    const AccountUpdated = await Account.findOneAndUpdate({ Account_Number: account_number}, 
      {
        Account_Type: n_account_type,
        BranchID: n_branch_id,
        Balance: AccJSONBal
      })

      res.json({message: "Account Updation Successful"});
})

router.post('/deleteaccount', async (req, res) =>
{
  let error = {}

    const account_number = req.body.Account_Number;
  
    const Acc = await Account.findOne({ Account_Number: account_number})
    if(!Acc)
    { 
      res.json({error_account: "No account exists with that account number."})
    }

    const AccountUpdated = await Account.findOneAndDelete({ Account_Number: account_number})

    res.json({message: "Account Deletion Successful"});
})


//LOGIN ROUTE

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public 

  module.exports = router;