const express = require('express');
const router = express.Router()
const UserController = require('../controller/UserController.js');
const auth = require('../middlewares/Auth.js');


router.post('/login', UserController.login, auth())

module.exports = router