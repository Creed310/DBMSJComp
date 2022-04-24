const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema

//Each account linked to a branch

const BranchSchema = new Schema(
    {
        BranchID:
        {
            type: String,
            required: true
        },
        Branch_Name:
        {
            type: String,
            required: true
        },
        Branch_City: 
        {
            type: String,
            required: true
        }
    }
)

//module.exports tells node.js which parts of the code can be exported and used by other files.
//model = constructors from schema definitions. an instance of a model = document.
//To use our schema definition, we need to convert our UserSchema into a Model we can work with. 
//To do so, we pass it into mongoose.model(modelName, schema):


//module.exports = Module Name = xx
module.exports = Branch = mongoose.model("branch", BranchSchema)