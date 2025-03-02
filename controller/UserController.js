const UserDal = require("../dataAccess/UserDal.js")
const Constants = require("../utils/Constants.js")
const jwt = require("jsonwebtoken");
const { ErrorResult, LoginResult } = require("../utils/Result.js")

class UserController {

    static #TAG = "UserController"

    login = async (req, res) => {
        const {email, password } = req.body
        let user
        await UserDal.login(email, password)
        .then(result => {
            //console.log(result)
            user = result.dataValues
            console.log(user)
            //res.status(200).json(new SuccessResult(result, Constants.loginSuccess))
        }, (error) => { 
            console.log(`${UserController.#TAG}, ${error}`)
            res.status(403).json(new ErrorResult(Constants.loginError));
        })
        .catch(error => {
            console.log(`${UserController.#TAG}, ${error}`) 
            res.status(403).json(new ErrorResult(Constants.loginError));
        })
        console.log("girdi")
        if(user.password != password) {
            res.status(402).json(new ErrorResult("email or password wrong."));
        }else{
            console.log(process.env.TOKEN_SECRET)
            const token = jwt.sign({ email: user.email, password: user.password, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.TOKEN_SECRET)
            delete user.password
            res.status(200).json(new LoginResult(user, token, `Welcome back, ${user.userName}`))
        }

    }
}

module.exports = new UserController