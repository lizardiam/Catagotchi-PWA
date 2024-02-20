const express = require('express');
const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');
const userRouter = require('./api/routes/user_router.js');

const app = express();

// Set the port the express server will listen on
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, '/dist/catagotchi')));

// Handle all GET requests to any route not handled explicitly by sending back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/catagotchi/index.html'));
});



//Importing libraries for cookies and sessions
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// Variable to save the current session
var session;

//Creating one day from miliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Set up cookie parser
app.use(cookieParser());

//Setting up Express Session details
app.use(sessions({
  secret: "affewiuhdjiwajdiowekndwoiajmdkwodkewldmwekdmwdkxmsc",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

