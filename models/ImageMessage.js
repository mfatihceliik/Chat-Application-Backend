const { sequelize } = require('../database/mysql.js'); 
const { DataTypes, Model } = require('sequelize');
const Message = require("./Message.js")


class ImageMessage extends Model {}
ImageMessage.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    imageUri: {
        type: DataTypes.STRING
    },
    imageBlob: {
        type: DataTypes.BLOB
    },
    text: {
        type: DataTypes.STRING
    },
}, { sequelize, tableName: "imageMessages", timestamps: false, createdAt: false, updatedAt: false, deletedAt: false })

module.exports = ImageMessage