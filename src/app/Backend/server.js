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
const port = process.env.PORT ?? 3000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening at http://localhost:${port}`)
  }
});

// Using CORS to communicate with an app on another port (Angular Frontend)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


// API Routen (register user router as /api/users)
app.use('/api/users', userRoutes)
app.use('/api/cats', catRoutes)

// Statische Dateien für das Angular Frontend
app.use(express.static(path.join(__dirname, '/dist/catagotchi')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());

//Session stuff
const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

app.use(sessions({
  secret: "very gud secret key. You can't guess it. ;)",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));


app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening at http://localhost:${port}`)
  }
});
