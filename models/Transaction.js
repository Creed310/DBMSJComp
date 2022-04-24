const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Can send transactions.
const TransactionSchema = new Schema(
    {
        TransactionID:
        {
            type: String,
            required: true
        },
        DoT:
        {
            type: Date,
            default: Date.now,
            required: true
        },
        T_Amount:
        {
            type: Number,
            required: true
        },
        S_Account_Number:
        {
            type: String,
            required: true
        },
        R_Account_Number:
        {
            type: String,
            required: true
        }
    }
)

module.exports = Transaction = mongoose.model("transaction", TransactionSchema)