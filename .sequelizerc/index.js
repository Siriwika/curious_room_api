var path = require('path')
module.exports = {
  'config':          path.resolve('./app/config', 'config.json'),
  'migrations-path': path.resolve('./app', 'migrations'),
  'models-path':     path.resolve('./app', 'models'),
  'middlewares-path':      path.resolve('/app', 'middlewares'),
  'seeders-path':    path.resolve('./app', 'seeders'),
}