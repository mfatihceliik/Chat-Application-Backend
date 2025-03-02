const mysql = require("../database/mysql.js")
const ImageMessage = require("../models/ImageMessage.js")
const Message = require("../models/Message.js")
const MessageDal = require("./MessageDal.js")
const FileSaver = require("../utils/FileSaver.js")

class ImageMessageDal {

    createImageMessage = async(uuId, conversationId, userId, messageContentTypeId, imageUrl, imageBlob, text) => {

        const t = await mysql.sequelize.transaction({autocommit: false})
        try {

            const message = await Message.create({
                uuId: uuId,
                conversationId: conversationId,
                userId: userId,
                messageContentTypeId: messageContentTypeId,
                sendAt: Date.now() 
            }, { transaction: t })

            await ImageMessage.create({
                id: message.id,
                imageUrl: imageUrl,
                imageBlob: imageBlob,
                text: text,
                sendAt: Date.now()
            }, { transaction: t })

            await t.commit()
            
            const result = await MessageDal.getMessageById(message.id)
            return result

        } catch (error) {
            t.rollback()
            throw error
        }
    }
}

module.exports = new ImageMessageDal