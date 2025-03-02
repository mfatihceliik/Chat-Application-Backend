const ConversationDal = require("../dataAccess/ConversationDal.js")
const Constants = require("../utils/Constants.js")
const { ErrorResult, SuccessDataResult } = require("../utils/Result.js")

class ConversationController {

    static #TAG = "ConversationController"

    createConversation = async(req, res) => {
        const creatorId = req.params.userId
        const { conversationName, users } = req.body
        return await ConversationDal.createConversation(creatorId, conversationName, users)
        .then(results => {
            return res.status(200).json(new SuccessDataResult(results, Constants.createConversationSuccess))
        }, (error) => {
            console.log(`${ConversationController.#TAG}, ${error}`)
            return res.status(200).json(new ErrorResult(Constants.createConversationError)) 
        })
        .catch(error => {
            console.log(`${ConversationController.#TAG}, ${error}`)
            return res.status(200).json(new ErrorResult(Constants.createConversationError)) 
        })
    }
}

module.exports = new ConversationController