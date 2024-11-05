// import websocket and Map
const WebSocket = require('ws');
const wsClients = new Map();
const config = require('../config/server-config');
let wsClient;
const path = require('path');
const fs = require('fs').promises;

// dotenv configured
require('dotenv').config();

// fetch all pending user requests function 
exports.getPendingUserRequests = (req, res) => {
	respondToClient(res, config.ports.database_service_port, { action: config.actions.fetch_pending_users_requests }); 
};

// abstracting the common code used to get available websocket client and send response to the client 
function respondToClient(res, port, data) {
    wsClient = getWebSocketClient(port);
    if (wsClient.readyState === WebSocket.OPEN) {
        sendDataToModel(res, wsClient, data);
    } else {
        wsClient.on('open', () => {
            sendDataToModel(res, wsClient, data);
        });
        wsClient.on('error', error => { 
            respond(res, { error: `WebSocket error on port ${port}: ${error.message}`});
        });
    }
}

// send stringified JSON data to the model service to process and respond
function sendDataToModel(res, wsClient, data) {
    wsClient.send(JSON.stringify(data));
    wsClient.once('message', message => {
        const parsedData = JSON.parse(message);         
        respond(res, parsedData);
    });
}

// function to run different json response to the client based on the data received from another backend service
function respond(res, data) {
    switch (data.action) {
        case config.actions.fetch_pending_user_requests_response: res.json(data.payload); break;
        case config.actions.fetch_registered_users_response: res.json(data.payload); break;
        // .. add more responses..
    }
}

// configure a websocket client based on the port 
function getWebSocketClient(port) {
  if (!wsClients.has(port)) { // if websocket client is unavailable, set new wsClient to the particular port in the map 
    const wsClient = new WebSocket(`ws://${process.env.DB_HOST}:${port}`);
    wsClients.set(port, wsClient);
  }
  return wsClients.get(port);
}



