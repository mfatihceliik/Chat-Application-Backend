const Participant = require("../models/Participant.js")
class ParticipantDal {
    
    createParticipant = async(userId, conversationId) => {
        const query = await Participant.create({
            userId: userId,
            conversationId: conversationId
        })

        return query
    } 

    findParticipantConversations = async userId => {
        const query = await Participant.findAll({
            where: {
                userId: userId
            }
        })

        return query
    }
}

module.exports = new ParticipantDal