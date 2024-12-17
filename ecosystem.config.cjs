module.exports = {
  apps: [
    {
      name: '2fa-client',
      script: 'npm',
      args: 'start',
      autorestart: true,
      env: {
        PORT: 3334,
      },
    },
  ],
}
