const ImageMessageDal = require("../dataAccess/ImageMessageDal.js")
const { SuccessDataResult, ErrorResult } = require("../utils/Result.js")
const Constants = require("../utils/Constants.js")

class ImageMessageManager {

    static #TAG = "ImageMessageManager"

    createImageMessage = async(uuId, conversationId, userId, messageContentTypeId, imageUrl, imageBlob, text) => {
        return await ImageMessageDal.createImageMessage(uuId, conversationId, userId, messageContentTypeId, imageUrl, imageBlob, text)
        .then(results => {
            return new SuccessDataResult(results, Constants.createImageMessageSuccess)
        }, (error) => {
            console.log(`${ImageMessageManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createImageMessageError)
        }).catch(error => {
            console.log(`${ImageMessageManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createImageMessageError)
        })
    }
}

module.exports = new ImageMessageManager