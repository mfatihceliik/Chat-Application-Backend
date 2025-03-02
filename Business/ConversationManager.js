const ConversationDal = require("../dataAccess/ConversationDal.js")
const { SuccessDataResult, ErrorResult } = require("../utils/Result.js")
const Constants = require("../utils/Constants.js")

class ConversationManager {

    static #TAG = "ConversationManager"

    createConversation = async(creatorId, conversationName, users) => {
        return await ConversationDal.createConversation(creatorId, conversationName, users)
        .then(results => {
            return new SuccessDataResult(results, Constants.createConversationSuccess)
        }, (error) => {
            console.log(`${ConversationManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createConversationError)
        }).catch(error => {
            console.log(`${ConversationManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createConversationError)
        })
    }
}

module.exports = new ConversationManager