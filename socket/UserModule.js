const UserManager = require("../Business/UserManager.js")
const Constants = require("../utils/Constants")
const { SuccessDataResult } = require("../utils/Result")


class UserModule {

    constructor(socket) {
        this.socket = socket
        this.getAllUsers()
    }

    static #TAG = "UserModule"


    async getAllUsers() {
        this.socket.on('getAllUsers', async(userId, callback) => {
            const id = parseInt(userId)
            const users = await this.allUsers(id)
            callback(users)
        })
    }

    async allUsers(userId) {
        try {
            const results = await UserManager.getAllUsers(userId)
            this.socket.emit('getAllUsers', results);
            return results
        } catch (error) {
            console.log(`${UserModule.#TAG}, ${error}`);
        }
    }

}

module.exports = UserModule