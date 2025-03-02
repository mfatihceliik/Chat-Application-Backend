const ParticipantDal = require("../dataAccess/ParticipantDal.js")
const Constants = require("../utils/Constants.js")
const { ErrorResult, SuccessDataResult } = require("../utils/Result.js")

class ParticipantManager {

    static #TAG = "ParticipantManager"

    createParticipant = async(userId, conversationId) => {
        return await ParticipantDal.createParticipant(userId, conversationId)
        .then(result => {
            return new SuccessDataResult(result, Constants.createParticipantSuccess)
        }, (error) => {
            console.log(`${ParticipantManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createParticipantError)
        }).catch(error => {
            console.log(`${ParticipantManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createParticipantError)
        })
    }

    findParticipantConversations = async userId => {
        return await ParticipantDal.findParticipantConversations(userId)
        .then(results => {
            return new SuccessDataResult(results, Constants.findParticipantConversationSuccess)
        }, (error) => {
            console.log(`${ParticipantManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findParticipantConversationError)
        }).catch(error => {
            console.log(`${ParticipantManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findParticipantConversationError)
        })
    }
}

module.exports = new ParticipantManager