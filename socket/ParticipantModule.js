const ParticipantManager = require("../Business/ParticipantManager.js")
const { SuccessDataResult, ErrorResult } = require("../utils/Result.js")
const Constants = require("../utils/Constants.js")

class ParticipantModule {

    constructor(socket) {
        this.socket = socket
        this.joinConversations()
    }

    static #TAG = "ParticipantModule"

    joinConversations() {
        this.socket.on('joinConversations', async(userId, callback) => {
            await this.findParticipantConversations(userId, callback)    
        })
    }

    async findParticipantConversations(userId, callback) {
        try {
            const results = await ParticipantManager.findParticipantConversations(userId)
            const participantConversations = await this.participantConversations(results.data)

            if(results.success) {
                console.log("girdi babajim")
                console.log(participantConversations)
                this.socket.join(participantConversations)
                callback(new SuccessDataResult(results.data, results.message))
            } else {
                callback(new ErrorResult(Constants.findParticipantConversationError))
            }

        } catch (error) {
            console.log(`${ParticipantModule.#TAG}, ${error}`)
            callback(new ErrorResult(Constants.findParticipantConversationError))
        }
    }

    async participantConversations(participants) {
        let conversationIdArray = []
        await participants.forEach(element => {
            conversationIdArray.push(element.conversationId)
        });

        return conversationIdArray
    }

}

module.exports = ParticipantModule