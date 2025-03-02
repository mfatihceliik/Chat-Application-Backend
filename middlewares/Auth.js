const jwt = require("jsonwebtoken");
const { ErrorResult} = require("../utils/Result");
const dotenv = require('dotenv');
const UserDal = require("../dataAccess/UserDal.js");

module.exports = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            if(token == null) {
                res.status(402).json(new ErrorResult("Unauthorized attempt.")) 
            }
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decode) => {
                if(err) {
                    console.log("GİRDİ BAK " + err)
                    return res.status(402).json(new ErrorResult("Token expired."));
                }
                await UserDal.findUserByEmail(decode.email.toString())
                .then(results => {
                    if(results == null) {
                        return res.status(401).json(new Error("Unauthorized attempt."))
                    }
                })
            })
            next()
        } catch(exception) {
            console.log("Exception: " + exception);
        }
    }
}