//Passport is an authentication middleware for Express.js. (only performs authentication on request.)

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
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
            User.findById(jwt_payload.id).then(user =>
                {
                    if(user)
                    {
                        return done(null, user)
                    }
                    return done(null, false)
                }
            ).catch(err => console.log(err))
        })
    )
}