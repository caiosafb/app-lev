const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dblev', 'lev', 'Administr@torDB', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize