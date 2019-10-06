
const express = require('express')

const loginRouter = express.Router()
const jsonBodyParser = express.json()
const LoginService = require('./login-service')
const logger = require('../logger')
const { requireAuth } = require('../auth/authentication')

loginRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        logger.info(req.user)
        let { username } = req.user
        return res.status(200).json(`${username} is now logged in`)
    })

module.exports = loginRouter