const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'MySQL1#', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;