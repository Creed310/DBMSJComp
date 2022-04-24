const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema

//User DEMO 

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
        date_of_creation: 
        {
            type: Date,
            default: Date.now
        }
    }
)

//module.exports tells node.js which parts of the code can be exported and used by other files.
//model = constructors from schema definitions. an instance of a model = document.
//To use our schema definition, we need to convert our UserSchema into a Model we can work with. 
//To do so, we pass it into mongoose.model(modelName, schema):


//module.exports = Module Name = xx
module.exports = User = mongoose.model("users", UserSchema)