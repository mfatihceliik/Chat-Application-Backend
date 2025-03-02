const TextMessageManager = require("../Business/TextMessageManager.js")
const UserManager = require("../Business/UserManager.js")
const Constants = require("../utils/Constants.js")
const isJsonString = require('../utils/IsJsonString.js')
const { SuccessDataResult, ErrorResult, LoginResult } = require("../utils/Result.js")
const { sendMessageNotification } = require("../controller/NotificationController.js")


class TextMessageModule {

    constructor(socket) {
        this.socket = socket
        this.onTextMessage()
    }

    static #TAG = "TextMessageModule"

    onTextMessage() {
        this.socket.on('onTextMessage', async(textMessage ,callback) => {
            const tMessage = isJsonString(textMessage) ? JSON.parse(textMessage) : textMessage
            await this.createTextMessage(tMessage, callback)
        })
    }

    async createTextMessage(tMessage, callback) {
        try {
            console.log(tMessage)
            const result = await TextMessageManager.createTextMessage
            (
                tMessage.uuId, // LOOK HERE
                tMessage.conversationId, 
                tMessage.userId, // LOOK HERE
                tMessage.messageContentTypeId, 
                tMessage.text
            )
            if(result.success) {
                await this.socket.join(tMessage.conversationId)
                this.socket.to(tMessage.conversationId).emit('onTextMessage', new SuccessDataResult(result.data, result.message))
                callback(new SuccessDataResult(result.data, result.message))

                await sendMessageNotification(tMessage.userId, tMessage.conversationId, tMessage.text)

            }else {
                callback(new ErrorResult(Constants.createTextMessageError))
            }
        } catch (error) {
            console.log(`${TextMessageModule.#TAG}, ${error}`)
            callback(new ErrorResult(Constants.createTextMessageError))
        }
    }
} 

module.exports = TextMessageModule