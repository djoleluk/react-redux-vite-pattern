const routes = {
    root: '/',
    pending_user_requests_route: '/api/pendingrequests'
}

const actions = {
    fetch_pending_users_requests: 'SELECT * FROM pendingUsersRequests', // replace with some_table
    fetch_pending_user_requests_response: 'fetchPendingUsersRequestsResponse'
}

const ports = {
    server_port: 3001, 
    database_service_port: 3002
}

const config = {
    routes,
    actions,
    ports 
}

module.exports = config;
