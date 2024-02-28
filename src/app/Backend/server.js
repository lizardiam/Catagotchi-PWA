const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user-routes.js');
const catRoutes = require('./Routes/cat-routes.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const cors = require('cors');

const app = express();

// set port/ or use environment variable if defined
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Using CORS (cross origin resource sharing) to communicate with an app on another port (Angular Frontend)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,        // allows cookies to be sent
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


// Statische Dateien für das Angular Frontend
app.use(express.static(path.join(__dirname, '/dist/catagotchi')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

// Parse JSON bodies ig (from requests) - formerly bodyParser.json()
app.use(express.json())

//Session stuff
const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

app.use(sessions({
  secret: "very gud secret key. You can't guess it. ;)",
  saveUninitialized:true,
  cookie: {maxAge: oneDay, secure: false, httpOnly: true},
  resave: false
}));

// Log session details
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});

//Pls remember for nextr time that routes have to be in the file AFTER ALL MIDDLEWARE
// API Routen (register user router as /api/users)
app.use('/api/users', userRoutes)
app.use('/api/cat', catRoutes)
