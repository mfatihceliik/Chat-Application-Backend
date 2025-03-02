const UserManager = require("../Business/UserManager.js")
const ConversationManager = require("../Business/ConversationManager.js")
const isJsonString = require("../utils/IsJsonString.js")
const { SuccessDataResult, ErrorResult } = require("../utils/Result.js")

class ConversationModule {

    constructor(socket) {
        this.socket = socket
        this.userConversationsListen()
        this.createConversation()
    }

    static #TAG = "ConversationModule"

    userConversationsListen() {
        this.socket.on('onConversations', async(userId, callback) => {
            await UserManager.getUserConversations(userId)
            .then(results => {
                callback(new SuccessDataResult(results.data, results.message))
            }, (error) => {
                console.log(`${ConversationModule.#TAG}, ${error}`)
                callback(new ErrorResult(error.message))
            })
            .catch(error => {
                console.log(`${ConversationModule.#TAG}, ${error}`)
                callback(new ErrorResult(error.message))
            })
        })
    }

    createConversation() {
        this.socket.on('onCreateConversation', async(conversation, callback) => {
            const tConversation = isJsonString(conversation) ? JSON.parse(conversation) : conversation
            await ConversationManager.createConversation(tConversation.creatorId, tConversation.conversationName, tConversation.users)
            .then(results => {
                callback(new SuccessDataResult(results.data, results.message))
            }, (error) => {
                callback(new ErrorResult(error.message))
            })
            .catch(error => {
                callback(new ErrorResult(error.message))
            })
        })
    }

}
module.exports = ConversationModule

/*module.exports = (socket, io) => {
    socket.on(Constants.userConversations, async (userId, callBack) => {
        await UserManager.getUserConversations(userId)
        .then(results => {
            callBack(new SuccessDataResult(results.data, results.message))
        }, (error) => {
            console.log()
        })
        .catch(error => {

        })
    })
}*/
