import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './src/app/Backend/Routes/user-routes.js';
import catRoutes from './src/app/Backend/Routes/cat-routes.js';

// set port/ environment variable
const port = process.env.PORT ?? 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening at http://localhost:${port}`)
  }
});

// API Routen (register user router as /api/users)
app.use('/api/users', userRoutes)
app.use('/api/cats', catRoutes)

// Statische Dateien für das Angular Frontend
app.use(express.static(path.join(__dirname, '/dist/catagotchi')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());
