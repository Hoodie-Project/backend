module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/src/main.js',
      watch: './dist',
      env: {
        NODE_ENV: 'production',
        DB_HOST: '172.31.41.82',
        DB_PORT: '5432',
        DB_USERNAME: 'postgres',
        DB_PASSWORD: 'Hoodie123!',
        DB_NAME: 'postgres',
        DB_SYNCHRONIZE: 'true',
      },
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
