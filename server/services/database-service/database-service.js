const WebSocket = require('ws');
const config = require('../../config/server-config');

const {
    getUsers,
    removeUser
} = require('./queries');

// dotenv configured
require('dotenv').config();

const wsServer = new WebSocket.Server({ port: config.ports.database_service_port });

// fetch and send all users from db table to controller via WebSocket 
wsServer.on('connection', wsSocket => {
    wsSocket.on('message', async message => {
        const request = JSON.parse(message);
        contactTableAndRespond(request, wsSocket);
    });
});


// function to interact with db tables and send a response to client
async function contactTableAndRespond(request, webSocket) {
    switch(request.action) {
        case config.actions.get_users:
            await getUsers(webSocket);
            break;
        case config.actions.remove_user:
            await removeUser(request.userId, webSocket);
            break;
        default:
            console.log(`Unhandled action: ${request.action}`);
    }
}



