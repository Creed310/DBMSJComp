//Passport is an authentication middleware for Express.js. (only performs authentication on request.)

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const keys = require("../config/keys"); 

//jwt = JSON Web Token
//JWT from request body is extracted, i.e the identity of the user.

//jwt_payload sent via login endpoints.

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) =>
        {

            //Mongoose - User.findById() used to find a single document by its _id field. 
            Customer.findById(jwt_payload.id).then(customer =>
                {
                    if(customer)
                    {
                        return done(null, customer)
                    }
                    return done(null, false)
                }
            ).catch(err => console.log(err))
        })
    )
}