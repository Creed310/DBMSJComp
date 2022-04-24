1. Secure Banking Transaction Using Virtual Password.

https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

<BACK-END>

- MongoDB UserID: varunraghav.ganesan2019@vitstudent.ac.in
- MongoDB Password: S

* Postman used to check POST requests.
1. Setting up dependencies. 

> npm init
- to setup a new npm package and set the entry point to "server.js" 

> brew update && brew install mongodb
- to install mongodb.

> npm i -g bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator
- to install certain npm modules necessary to build the application.
- install them globally using -g. 

> npm i -D -g nodemon
* -D = devDependency, adds it to the devDependencies list. 
- to ensure that the webpage refreshes every time the source code changes to reflect it. 
(Make sure to use nodemon instead of node when you run your code for development purposes.)

- change in package.json.
* package.json contains the metadata and defines the functional attributes.
* "scripts": stuff that you run npm <script_name>
"scripts": 
{
    "start": "node server.js",
    "server": "nodemon server.js",
},

- go to mLab to connect to mongoDB.
- Select AWS as your cloud provider and Sandbox as your plan type.

> mkdir config && cd config && touch keys.js

- module.exports = 
{
  mongoURI: mongodb+srv://vrg:<password>@cluster0.7i9fg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
};
- Replace <password> with the password for the vrg user (Dysonsphere1). Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.

2. Setting up the server. 
* in server.js
  - include dependencies 
    1. express - for express.
    2. mongoose - to interact with MongoDB.
    3. body-parser - parses incoming request bodies in a middleware before your handlers
  - initialise the app using express()
  - apply the middleware function for bodyparser so we can use it.
  - pull in MongoURI from key.js so the app can connect to the mongoDB database.
  - set the port for the server to run into and have the app listen to it.

3. Defining user schema. 
> mkdir models && cd models && touch User.js
* in User.js
  - pull in required dependencies.
  - create schema to represent user, defining fields and types of objects in the schema. 
  - export the model so it can be used outside of the file.

4. Setting up form validation.
> mkdir validation && cd validation && touch register.js login.js
- to validate each route before setting up routes.

* in register.js and login.js (to basically validate the input given by the user)
  - include validator and is-empty dependencies.
  - export the function 'validateRegisterInput', in which, data is a parameter.
  - instantiate the errors object.
  - all empty fields -> all empty strings before running validation checks. [validator only works with strings]
  - empty fields, valid email formats, password requirements, confirm password equality using Valiidator functions.
  - Error handling done by errors object.

5. Setting up API routes.
> mkdir routes && cd routes && mkdir api && cd api && touch users.js
 - loading register and input validation.
 - loading the user model.

5.1 Creating the <Register Endpoint>
  - pull in the errors and isRegisterValid variables from validateRegisterInput(req.body)
    - if the input is valid, use MongoDB's <User.findOne()> function to check if the user already exists.
      - if the user doesn't already exist, fill in the (name, email, password) with data sent in the BODY of the request.
  - <bcryptjs> hashes the password before it is stored in the DB.

* The <try> statement lets you <test a block of code to check for errors.>
* The <catch> statement lets you <handle the error if any are present.>
* The <throw> statement lets you <make your own errors.>

5.3 Creating the <Passport Authentication module.>

5.4 Creating the <Login Endpoint>
  - pull in the errors and isRegisterValid variables from validateRegisterInput(req.body)
  - if valid input, use MongoDB’s User.findOne() to see if the user exists
  - if user exists, use bcryptjs to compare submitted password with hashed password in our database
    - If passwords match, create our JWT Payload
  - sign our jwt, including our payload, keys.secretOrKey from keys.js, and setting a expiresIn time (in seconds)
  - if successful, append the token to a Bearer string (remember in our passport.js file, we set opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();)

NOTE: in code, using req.body instead of req.params. it is safer as cannot be seen in URL.

<FRONT-END>

- Set up our frontend using create-react-app
- Create static components for our Navbar, Landing, Login and Register pages
- Setup Redux for global state management

* Edit the "scripts" object to the following in our server’s package.json.

1. Edit the root package.json

- "scripts": 
  {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },

* We’ll use concurrently to run both our backend and frontend (client) at the same time. We’ll use npm run dev to run this command later on.

2. Scaffold our client with create-react-app

- create-react-app to set up our client.
- This will take care of a lot of heavy lifting for us (as opposed to creating a React project from scratch).

> npm i -g create-react-app
- installs create-react-app globally.

> mkdir client && cd client && create-react-app .
create a client directory and run create-react-app within it.

3. Change our package.json within our client directory
- we make requests from React with axios
- we don’t want to have to do the following in our requests:
> axios.post(‘http://localhost:8080/api/users/register');

- We want to be able to do the following instead.
> axios.post('/api/users/register');

- To achieve this, add the following under the "scripts" object in our client's package.json.
"proxy": "http://localhost:8080",

4. Within client, install the following dependencies using npm

5. Run npm run dev and test if both server and client run concurrently and successfully

6. Clean up our React app by removing unnecessary files and code