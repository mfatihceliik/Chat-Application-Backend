const { sequelize } = require('../database/mysql.js');
const { DataTypes } = require('sequelize');

const Conversation = sequelize.define('conversations', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.BIGINT,
    },
    conversationName: {
        type: DataTypes.STRING
    },
    createdDate: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'conversations',
    timestamps: false
})


module.exports = Conversation