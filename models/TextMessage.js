const { sequelize } = require('../database/mysql.js'); 
const { DataTypes, Model } = require('sequelize');
const Message = require("./Message.js")

class TextMessage extends Model {}
TextMessage.init({
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    text:{
        type: DataTypes.STRING
    },
}, { sequelize, modelName: "textMessages", timestamps: false, createdAt: false, updatedAt: false, deletedAt: false })

module.exports = TextMessage