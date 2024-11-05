module.exports = {
  apps: [
    {
      name: 'main-server',
      script: './server/server.js',
      node_args: '--expose-gc',
      env_file: '.env',
      env: {
        NODE_ENV: 'development', // set to production 
        PORT: 3001,
      },
      autorestart: true,
      watch: true, // set to false on production
      max_memory_restart: '1G',
    },
    {
      name: 'database-service',
      script: './server/services/database-service/database-service.js',
      env_file: '.env',
      env: {
        NODE_ENV: 'development',// set to production 
        PORT: 3002,
      },
      autorestart: true,
      watch: true, // set to false on production
      max_memory_restart: '1G',
    }
  ],
};
