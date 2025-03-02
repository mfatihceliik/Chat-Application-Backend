const { where, QueryTypes } = require("sequelize")
const mysql = require("../database/mysql.js")
const ImageMessage = require("../models/ImageMessage.js")
const Message = require("../models/Message.js")
const MessageContentType = require("../models/MessageContentType.js")
const TextMessage = require("../models/TextMessage.js")
const User = require("../models/User.js")
class MessageDal {
    
    getMessageById = async (id) => {
        const query = await Message.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['userId'] },
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: MessageContentType, as: 'messageContentType' },
                { model: TextMessage, as: 'textMessage' },
                { model: ImageMessage, as: 'imageMessage', attributes: { exclude: ['imageBlob'] } }
            ],
            nest: true,
            type: QueryTypes.SELECT
        })

        return query
    }

    getTextMessageById = async(id) => {
        const query = await Message.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['userId'] },
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: TextMessage, as: 'textMessage' }
            ],
        })
        
        return query
    }

    getImageMessageById = async(id) => {
        const query = await Message.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['userId'] },
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: ImageMessage, as: 'imageMessage', attributes: { exclude: ['imageBlob'] } }
            ],
        })
        
        return query
    }
}

module.exports = new MessageDal