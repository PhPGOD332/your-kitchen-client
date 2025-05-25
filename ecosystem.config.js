module.exports = {
  apps: [
    {
      name: 'your-kitchen-client',
      script: 'node_modules/next/dist/bin/next',
      args: '-p 3000',
      exec_mode: 'fork',
      max_memory_restart: "1G",
      autorestart: true
    }
  ]
}