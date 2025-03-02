const UserDal = require("../dataAccess/UserDal.js")
const Constants = require("../utils/Constants.js")
const { SuccessResult, ErrorResult, SuccessDataResult } = require("../utils/Result.js")

class UserManager {
    
    static #TAG = "UserManager"

    getAllUsers = async(userId) => {
        return await UserDal.getAllUsers(userId)
        .then(results => {
            const mappedResult = results.map(user => user.dataValues)
            return new SuccessDataResult(mappedResult, Constants.getAllUsersSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getAllUsersError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getAllUsersError)
        })
    }

    getUsersConversationTokens = async(conversationId) => {
        return await UserDal.getUsersConversationTokens(conversationId)
        .then(results => {
            const mappedResult = results.map(user => user.dataValues)
            return new SuccessDataResult(mappedResult, Constants.getAllUsersTokenSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getAllUsersTokenError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getAllUsersTokenError)
        })
    }

    getUserFcmToken = async(userId) => {
        return await UserDal.findUserById(userId)
        .then(results => {
            const token = results.dataValues.token
            return new SuccessDataResult(token, Constants.findUserByIdSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByIdError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByIdError)
        })
    }

    findUserById = async id => {
        return await UserDal.findUserById(id)
        .then(results => {
            return new SuccessDataResult(results, Constants.findUserByIdSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByIdError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByIdError)
        })
    }

    findUserByEmail = async email => {
        return await UserDal.findUserByEmail(email)
        .then(results => {
            return new SuccessDataResult(results, Constants.findUserByEmailSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByEmailError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.findUserByEmailError)
        })
    }

    getUserConversations = async id => {
        return await UserDal.getUserConversations(id)
        .then(results => {
            const mappedResult = results.map(user => user.dataValues)
            const conversationsArray = mappedResult.map(user => user.conversations)
            return new SuccessDataResult(conversationsArray[0], Constants.getUserConversationSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getUserConversationError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.getUserConversationError)
        })
    }

    createUser = async(userName, email, password) => {
        return await UserDal.createUser(userName, email, password)
        .then(result => {
            return new SuccessResult(Constants.createUserSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createUserError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.createUserError)
        })
    }

    updateUser = async(id, userName, email, password) => {
        return await UserDal.updateUser(id, userName, email, password)
        .then(result => {
            return new SuccessDataResult(result, Constants.updateUserSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.updateUserError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.updateUserError)
        })
    }

    deleteUser = async id => {
        return await UserDal.deleteUser(id)
        .then(result => {
            return new SuccessDataResult(result, Constants.deleteUserSuccess)
        }, (error) => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.deleteUserError)
        }).catch(error => {
            console.log(`${UserManager.#TAG}, ${error}`)
            return new ErrorResult(Constants.deleteUserError)
        })
    }
}

module.exports = new UserManager