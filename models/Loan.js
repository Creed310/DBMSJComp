const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoanSchema = new Schema(
    {
        LoanID:
        {
            type: String,
            required: true
        },
        DoL:
        {
            type: Date,
            required: true
        },
        L_Amount:
        {
            type: Number,
            required: true
        },
        Account_Number:
        {
            type: String,
            required: true
        },
        Loan_Interest:
        {
            type: Number,
            required: true
        }
    }
)

module.exports = Loan = mongoose.model("loan", LoanSchema)