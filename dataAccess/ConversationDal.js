const mysql = require("../database/mysql.js")
const User = require("../models/User.js")
const TextMessage = require("../models/TextMessage.js")
const ImageMessage = require("../models/ImageMessage.js")
const Participant = require("../models/Participant.js")
const Conversation = require("../models/Conversation.js")
const { QueryTypes } = require("sequelize")
class ConversationDal {

    getConversationById = async conversationId => {
        const query = await Conversation.findOne({
            where: {
                id: conversationId
            },
            attributes: { exclude: ['userId'] },
            include: [
                { model: User, as: 'groupMembers', attributes: { exclude: ['password'] } },
                { model: TextMessage, as: 'textMessage' },
                { model: ImageMessage, as: 'imageMessage', attributes: { exclude: ['imageBlob'] } }
            ],
            nest: true,
            type: QueryTypes.SELECT
        })

        return query
    }

    createConversation = async(creatorId, conversationName, users) => {
        const t = await mysql.sequelize.transaction({autocommit: false})
        try {
            
            const conversation = await Conversation.create({
                creatorId: creatorId,
                conversationName: conversationName
            }, { transaction: t })

            await Participant.create({
                userId: creatorId,
                conversationId: conversation.id
            }, { transaction: t })

            for (const user of users) {
                await Participant.create({
                    userId: user.id,
                    conversationId: conversation.id
                }, { transaction: t });
            }

            await t.commit()

            return this.getConversationById(conversation.id)

        } catch (error) {
            await t.rollback()
            throw error
        }
    }
}

module.exports = new ConversationDal