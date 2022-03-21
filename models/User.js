const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        password: 
        {
            type: String,
            required: true
        },
        date: 
        {
            type: Date,
            default: Date.now
        }
    }
)

//module.exports tells node.js which parts of the code can be exported and used by other files.
//model = constructors from schema definitions. an instance of a model = document.

module.exports = User = mongoose.model("users", UserSchema)