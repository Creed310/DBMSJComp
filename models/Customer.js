const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema

//The new operator lets developers create an instance of a USER-DEFINED OBJECT TYPE
// or of one of the built-in object types that has a constructor function.

const CustomerSchema = new Schema(
    {
        CustomerID:{
            type: String,
            required: true
        },
        C_First_Name:
        {
            type: String,
            required: true
        },
        C_Middle_Name: 
        {
            type: String
        },
        C_Last_Name: 
        {
            type: String
        },
        Aadhar_Number:
        {
            type: Number,
            required: true
        },
        Occupation: 
        {
            type: String,
            required: true
        },
        City: 
        {
            type: String,
            required: true
        },
        MobileNumber:
        {
            type: Number,
            required: true
        },
        DoB:
        {
            type: Date,
            required: true
        }
    }
)

//module.exports tells node.js which parts of the code can be exported and used by other files.
//model = constructors from schema definitions. an instance of a model = document.
//To use our schema definition, we need to convert our UserSchema into a Model we can work with. 
//To do so, we pass it into mongoose.model(modelName, schema):


module.exports = Customer = mongoose.model('customers', CustomerSchema)