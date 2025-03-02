const { sequelize } = require('../database/mysql.js');
const { DataTypes } = require('sequelize');

const Participant = sequelize.define('participants', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT
    },
    conversationId: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'participants',
    timestamps: false,
})

module.exports = Participant