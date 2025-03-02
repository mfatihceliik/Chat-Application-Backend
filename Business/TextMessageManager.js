const TextMessageDal = require("../dataAccess/TextMessageDal.js")
const Constants = require("../utils/Constants.js")
const { SuccessResult, ErrorResult, SuccessDataResult } = require("../utils/Result.js")

class TextMessageManager {

    static #TAG = "TextMessageManager"
    
    createTextMessage = async(uuId, conversationId, userId, messageContentTypeId, text) => {
        try {
            const results = await TextMessageDal.createTextMessage(uuId, conversationId, userId, messageContentTypeId, text)
            return new SuccessDataResult(results, Constants.createTextMessageSuccess)
        } catch (error) {
            console.log(`${TextMessageManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createTextMessageError)
        }
    }
}

module.exports = new TextMessageManager