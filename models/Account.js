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
            type: String,
            required: true
        },
        CustomerID:
        {
            type: String,
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
            type: String,
            required: true,
            default: 0
        },
        PIN_Number:
        {
            type: String,
            required: true
            //Assigned by System.
        }
    }
)

module.exports = Account = mongoose.model("account", AccountSchema)