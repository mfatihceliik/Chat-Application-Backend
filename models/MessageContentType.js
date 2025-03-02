const { sequelize } = require('../database/mysql.js');
const { DataTypes } = require('sequelize');

const MessageContentType = sequelize.define('messagecontenttype', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'messagecontenttype',
    timestamps: false
})

module.exports = MessageContentType