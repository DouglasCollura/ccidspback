const {config} = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  development: {
    url: URI,
    dialect: 'postgres'
  }
}
