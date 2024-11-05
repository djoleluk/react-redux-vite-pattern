// import express module and controllers
const express = require('express');
const itemsController = require('../controllers/items-controller');
const config = require('../config/server-config');
const multer = require('multer');

// dotenv configured
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, process.env.VIDEOS_DIRECTORY_PATH);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Use the filename sent from the client
  }
});

// TODO maybe set upload limit to this with additional property?   
const upload = multer({ storage: storage }); 

// create router for the app
const router = express.Router();

// declare routes
router.get(config.routes.pending_user_requests_route, itemsController.getPendingUserRequests);
// add more routes...

// export the router
module.exports = router;
