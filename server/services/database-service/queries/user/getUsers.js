const config = require('../../../../config/server-config');
const { contactTableAndSendDataToWebsocket } =  require('../../../../utilities/db-utils');
const sendArrayResponseToClient = require('../../utils/sendArrayResponseToClient');

async function getUsers(webSocket) {
    await contactTableAndSendDataToWebsocket(webSocket, config.actions.get_users, [], (items, ws) => { 
        console.log("Items: ", items);
        sendArrayResponseToClient(config.actions.get_users_response, items, ws); 
    });
}

module.exports = getUsers;
