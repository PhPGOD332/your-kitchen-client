module.exports = {
  apps: [
    {
      name: 'your-kitchen-client',
      cwd: "node_modules/next/dist/bin/next",
      script: 'npm',
      args: '-p 3000',
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: "1G",
      error_file: "/var/log/pm2/next-error.log",
      autorestart: true
    }
  ]
}