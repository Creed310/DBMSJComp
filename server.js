// Including dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const customer = require("./routes/api/customer");
const account = require("./routes/api/account");
const branch = require("./routes/api/branch");
const path = require('path');

// Initializing the application
const app = express();

// Bodyparser Middleware - handles incoming request bodies in a middleware before the handlers.

// Middleware functions - have access to request, response objects and next function
// like app.get('/', function (req, res, next) { next(); })
// Here, 'function(req, res, next)' is the middleware function.   

// .json() : inputs a response body and outputs a promise which is a result parsed into JSON.

// app.use(path, callback) : MOUNTS specified middleware function at the path and SETS UP middleware.

// app.use(bodyParser.urlencoded()) : transforms URL-encoded requests -> JS-accessible variables under req.body.
// app.use(bodyParser.json()) : transforms JSON inputs -> JS-accessible variables under req.body.

// Basically, these two functions parse incoming request bodies in a middleware and allow them to be used as JS-accessible variables. 

// middleware - functions that run between the time the server recieves a request anda the time it sends a response
// middleware runs in order of which you define it.

app.use(bodyParser.urlencoded(
  {
    extended: false
  })
);

//app.set("view engine", "ejs")

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());


// Passport config
require("./config/passport")(passport);

// Routes
// this middleware runs and is called?

app.use("/api/customer", customer);
app.use("/api/account", account);
app.use("/api/branch", branch);

// DB configuration.

const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose.connect(db, {useNewURlParser: true}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err))

// Setting up the port and listening to it. 

const port = 8000
app.listen(port, () => console.log('Server up and running on port', port, '!'));

app.get("/", (req, res)=>
{
  res.sendFile(path.join(__dirname, './views/index.html'));
})

app.get("/views", (req, res)=>
{
  res.sendFile(path.join(__dirname, './views/account.html'));
})
//app.get('URL', (req, res) => {})


