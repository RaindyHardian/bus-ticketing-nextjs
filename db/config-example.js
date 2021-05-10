const Sequelize = require('sequelize')

module.exports = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});