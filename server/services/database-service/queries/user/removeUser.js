const config = require('../../../../config/server-config');
const { contactTableAndSendDataToWebsocket } = require('../../../../utilities/db-utils');
const sendArrayResponseToClient = require('../../utils/sendArrayResponseToClient');

async function removeUser(userId, webSocket) {
    await contactTableAndSendDataToWebsocket(webSocket, config.actions.remove_user, [userId], (result, ws) => {
        console.log('User id: ', userId);
        if (result && result.rowCount > 0) {
            sendArrayResponseToClient(config.actions.remove_user_response, [{ success: true, userId }], ws);
        } else {
            sendArrayResponseToClient(config.actions.remove_user_response, [{ success: false, error: 'Failed to remove user' }], ws);
        }
    });
}

module.exports = removeUser; 