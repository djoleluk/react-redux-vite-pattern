// import express module
const express = require('express');
const cors = require('cors');
const router = require('./routes/user-routes');
const bodyParser = require('body-parser');
const config = require('./config/server-config');
const path = require('path');

// dotenv configured
require('dotenv').config();

// create express server and PORT
const server = express();
const PORT = config.ports.server_port;

// use json and cors
server.use(bodyParser.json());
server.use(cors());

// Serve static files from the React app
server.use(express.static(path.join(__dirname, '../client/build')));

// app router
server.use(config.routes.root, router);

// Catch-all handler to serve the React app for any unhandled routes
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// run the server
server.listen(PORT, () => console.log('Server is running on port: ', PORT));