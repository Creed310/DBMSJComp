const express = require("express");
const router = express.Router();

const Transaction = require("../../models/Transaction")

//REGISTER ROUTE

router.post("/transactions" , async(req,res) => {
    try {
    const { id, count, id2 } = req.body;
    const data = await user.findById(id);
    const data2 = await user.findById(id2);
  // console.log(req.body);
    const newTrans = new transactions({
      userOne : data.name,
      userTwo:data2.name,
      amount:count
    })
  
    await newTrans.save();
  } catch (e) {
    console.log(e);
  }
  })
  module.exports = router;