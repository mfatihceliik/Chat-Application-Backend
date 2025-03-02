const ImageMessageManager = require("../Business/ImageMessageManager.js")
const Constants = require("../utils/Constants.js")
const FileSaver = require("../utils/FileSaver.js")
const { SuccessDataResult, ErrorResult, ErrorDataResult } = require("../utils/Result.js")
const { sendMessageNotification } = require("../controller/NotificationController.js")


class ImageMessageModule {

    constructor(socket) {
        this.socket = socket
        this.onImageMessage()
    }

    static #TAG = "ImageMessageModule"

    onImageMessage() {
        this.socket.on('onImageMessage', async(imageMessage, callback) => {
            console.log("girdi 1")
            const iMessage = JSON.parse(imageMessage)
            await this.createImageMessage(iMessage, callback)
        })
    }

    async createImageMessage(iMessage, callback) {
        try {
            const uniqueImageName = await FileSaver.saveImage(iMessage.imageBlob, iMessage.uuId, iMessage.conversationId)
            const imageUrl = Constants.imageEndPoint + uniqueImageName
            console.log(iMessage.uuId.toString())
            const result = await ImageMessageManager.createImageMessage
            (
                iMessage.uuId, // LOOK 
                iMessage.conversationId,
                iMessage.userId, // LOOK HERE
                iMessage.messageContentTypeId,
                imageUrl,
                iMessage.imageBlob,
                iMessage.text
            )

            if(result.success) {
                this.socket.join(iMessage.conversationId)
                this.socket.to(iMessage.conversationId.toString()).emit('onImageMessage', new SuccessDataResult(result.data, result.message))
                callback(new SuccessDataResult(result.data, result.message))
                await sendMessageNotification(iMessage.userId, iMessage.conversationId, iMessage.text)
            } else {
                FileSaver.deleteImage(uniqueImageName)
                callback(new ErrorResult(Constants.createImageMessageError))
            }
        } catch (error) {
            console.log(`${ImageMessageModule.#TAG}, ${error}`)
            callback(new ErrorResult(Constants.createImageMessageError))
        }
    }
    
}

module.exports = ImageMessageModule