const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, '/dist/catagotchi')));

// Handle all GET requests to any route not handled explicitly by sending back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/catagotchi/index.html'));
});

// Set the port the express server will listen on
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
