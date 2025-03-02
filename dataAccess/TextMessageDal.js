const mysql = require("../database/mysql.js")
const Message = require("../models/Message.js")
const TextMessage = require("../models/TextMessage")
const MessageDal = require("./MessageDal.js")
class TextMessageDal {
    
    createTextMessage = async (uuId, conversationId, userId, messageContentTypeId, text) => {

        const t = await mysql.sequelize.transaction({autocommit: false})
        try {
            
            const message = await Message.create({
                uuId: uuId,
                conversationId: conversationId,
                userId: userId,
                messageContentTypeId: messageContentTypeId,
                sendAt: Date.now() 
            }, { transaction: t })

            await TextMessage.create({
                id: message.id,
                text: text
            }, { transaction: t })
            
            await t.commit()

            const result = await MessageDal.getMessageById(message.id)
            return result

        } catch (error) {
            await t.rollback()
            throw error
        }
    }
}

module.exports = new TextMessageDal