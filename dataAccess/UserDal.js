const User = require("../models/User.js")
const Conversation = require("../models/Conversation.js")
const TextMessage = require("../models/TextMessage.js")
const ImageMessage = require("../models/ImageMessage.js")
const MessageContentType = require("../models/MessageContentType.js")
const Message = require("../models/Message.js")
const { Op, QueryTypes } = require("sequelize")

class UserDal {

    getAllUsers = async(userId) => {
        const query = await User.findAll({
            where: {
                id: { [Op.ne]: userId }
            },
            attributes: { exclude: ['password'] }
        })

        return query
    }

    findUserById = async id => {
        const query = await User.findOne({
            where: {
                id: id
            }
        })

        return query
    }

    getUsersConversationTokens = async(conversationId) => { 
        const query = await User.findAll({
            attributes: ['token'], // Yalnızca token alanını seçiyoruz
            include: [{
              model: Conversation,
              attributes: [], // Conversation bilgilerini döndürmüyoruz
              where: { id: 1 },
              through: { attributes: [] } // Participant tablosundaki ilişkisel veriyi atlamak için
            }]
          })
          return query
    }

    findUserByEmail = async email => {
        const query = await User.findOne({
            where: {
                email: email
            }
        })

        return query
    }

    login = async (email, password) => {
        const query = await User.findOne({
            where: {
                email: email,
                password: password
            },
        })
        return query
    }

    getUserConversations = async id => {
        const query = await User.findAll({
        where: {
            id: id
        },
        attributes: { exclude: ['id','email','userName','password'] },
        include: [
            {
                model: Conversation,
                through: { attributes: [] },
                include: [
                    { 
                        model: Message,
                        attributes: { exclude: ['userId'] },
                        include: [
                            { model: User, attributes: { exclude: ['password'] } },
                            { model: MessageContentType, as: 'messageContentType' },
                            { model: TextMessage, as: 'textMessage' },
                            { model: ImageMessage, as: 'imageMessage', attributes: { exclude: ['imageBlob'] } }
                        ],
                        order: [['id', 'ASC']],
                        separate: true
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password'] },
                        through: { attributes: [] },
                        as: 'groupMembers'
                    }
                ]
            }
        ],
        nest: true,
        type: QueryTypes.SELECT
    })
        return query
    }

    createUser = async(userName, email, password) => {
        const query = await User.create({
            userName: userName,
            email: email,
            password: password
        })

        return query
    }

    updateUser = async(id, userName, email, password) => {
        const query = await User.update({
            userName: userName,
            email: email,
            password: password
        }, {
            where: {
                id: id
            }
        })

        return query
    }

    deleteUser = async id => {
        const query = await User.destroy({
            where: {
                id: id
            }
        }) 

        return query
    }

}

module.exports = new UserDal