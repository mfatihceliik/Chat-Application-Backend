const { sequelize } = require('../database/mysql.js'); 
const { DataTypes, Model } = require('sequelize');

class Message extends Model {}
Message.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.BIGINT
    },
    userId: {
        type: DataTypes.BIGINT
    },
    messageContentTypeId: {
        type: DataTypes.BIGINT
    },
    isSend: {
        type: DataTypes.BOOLEAN
    },
    sendAt:{
        type: DataTypes.DATE
    },
}, { sequelize, modelName: "messages", timestamps: false, createdAt: false, updatedAt: false, deletedAt: false })

module.exports = Message