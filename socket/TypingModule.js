const Constants = require("../utils/Constants")
const { SuccessDataResult } = require("../utils/Result")

class TypingModule {

    constructor(socket) {
        this.socket = socket
        this.typing()
    }

    static #TAG = "TypingModule"


    async typing() {
        this.socket.on('typing', async(typing, callback) => {
            const stringify = JSON.stringify(typing)
            const mTyping = JSON.parse(stringify)
            callback("bravo")
            this.socket.to(mTyping.conversationId).emit('onTyping', new SuccessDataResult(mTyping, "success."))
        })
    }
}

module.exports = TypingModule