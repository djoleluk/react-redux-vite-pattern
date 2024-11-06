const routes = {
    root: '/',
    get_users_route: '/api/users',
    remove_user_route: '/api/users/:user_id'
}

const actions = {
    get_users: 'SELECT * FROM users',
    get_users_response: 'getUsersResponse',
    remove_user: 'DELETE FROM users WHERE user_id = $1',
    remove_user_response: 'removeUserResponse'
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
