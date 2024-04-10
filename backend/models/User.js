const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    cpf: {
        type: DataTypes.STRING, 
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    confirmpassword: {
        type: DataTypes.STRING,
        required: true
    },
}, { timestamps: true})
 

module.exports = User