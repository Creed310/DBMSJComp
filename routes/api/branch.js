const express = require("express");
const router = express.Router();

// Loading models

const Branch = require("../../models/Branch")

//REGISTER ROUTE

router.get("/viewall", async (req, res) => {
    try {
      const branch = await Branch.find();
      res.send(branch);
    } catch (e) {
      console.log(e);
      res.status(500).json();
    }
  });

router.get("/view/:branch_id", async (req, res) => 
{
    const branch_id = req.params.branch_id;
    
    // Find user by email
    Branch.findOne({ BranchID: branch_id }).then((branch) =>
    {
        if(branch)
        {
            res.send(branch)
        }
        else
        {
            res.json({error: "There exists no branch with that branch ID"})
        }
    })
});

//LOGIN ROUTE

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public 

  module.exports = router;