class Result {
    constructor(message, success) {
        this.message = message
        this.success = success
    }
}

class LoginResult extends Result {
    constructor(data, token, message) {
        super(message, true)
        this.data = data
        this.token = token
    }
}

class SuccessMessage extends Result {
    constructor(message) {
        super(message, true)
    }
}

class SuccessResult extends Result {
    constructor(message){
        super(message, true)
    }
}

class SuccessDataResult extends SuccessResult {
    constructor(data, message) {
        super(message)
        this.data = data
    }
}

class ErrorResult extends Result {
    constructor(message){
        super(message, false)
    }
}

class ErrorDataResult extends ErrorResult {
    constructor(data, message) {
        super(message)
        this.data = data
    }
}

module.exports = {
    Result,
    ErrorResult,
    SuccessResult,
    SuccessDataResult,
    ErrorDataResult,
    LoginResult,
    SuccessMessage
}
