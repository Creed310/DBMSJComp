const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Account - This is the account that is created by the customer. 

const AccountSchema = new Schema(
    {
        Account_Number:
        {
            type: String,
            required: true
        },
        Account_Type:
        {
            type: Date,
            required: true
        },
        CustomerID:
        {
            type: Number,
            required: true
        },
        AoD:
        {
            type: Date,
            default: Date.now,
            required: true
        },
        BranchID:
        {
            type: String,
            required: true
        },
        Balance:
        {
            type: Number,
            required: true,
            default: 0
        },
        PIN_Number:
        {
            type: Number,
            required: true
            //Assigned by System.
        }
    }
)

module.exports = Account = mongoose.model("account", AccountSchema)