const MessageDal = require("../dataAccess/MessageDal.js")
const Constants = require("../utils/Constants.js")
const { SuccessDataResult, ErrorResult } = require("../utils/Result.js")

class MessageModule {

    constructor(socket, io) {
        this.socket = socket
        this.io = io
        this.onTextMessage()
    }

    static #TAG = "TextMessageModule"

    onMessage() {
        this.socket.on('onMessage', async(textMessage ,callback) => {
            //const tMessage = JSON.stringify(textMessage)
            //await this.createTextMessage(tMessage, callback)
        })
    }

    /*async createTextMessage(tMessage, callback) {
        try {
            const result = await MessageDal.createTextMessage(tMessage.conversationId, tMessage.userId, tMessage.text)
            if(result.success) {
                this.socket.join(tMessage.conversationId)
                this.socket.to(`${tMessage.conversationId}`).emit('onTextMessage', new SuccessDataResult(result.data, result.message))
                callback(new SuccessDataResult(result.data, result.message))
            }
        } catch (error) {
            console.log(`${TextMessageModule.#TAG}, ${error}`)
            callback(new ErrorResult(Constants.createTextMessageError))
        }
    }*/
} 

module.exports = MessageModule