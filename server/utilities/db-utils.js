const pool = require('../config/db-config');
const moment = require('moment-timezone');

async function queryDatabase(query, params) {
   const result = await pool.query(query, params);
    return withAdjustedTimezone(result);
}

function getSystemTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function withAdjustedTimezone(queryResult) {
	const systemTimezone = getSystemTimezone();
	const adjustedResult = queryResult.rows.map(row => {
		row.request_date = moment.utc(row.request_date).tz(systemTimezone).format(); 
		return row;
	});
	return adjustedResult;
}

async function contactTableAndSendDataToWebsocket(webSocket, query, queryParams, callback) {
	const rows = await queryDatabase(query, queryParams, webSocket);
    if (callback) {
        callback(rows, webSocket);
		return rows;
    }
    return rows; // Return the query result
}

module.exports = {
   contactTableAndSendDataToWebsocket
};