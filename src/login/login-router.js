
const express = require('express')

const loginRouter = express.Router()
const jsonBodyParser = express.json()
const LoginService = require('./login-service')
const logger = require('../logger')
const { requireAuth } = require('../auth/authentication')
const AuthService = require('../auth/auth-service')

loginRouter
    .route('/')
    .all(jsonBodyParser)
    .all(requireAuth)
    .post((req, res, next) => {
        logger.info(`req.user in login router`)
        logger.info(req.user)
        let { id, username } = req.user
            const sub = username
            logger.info(sub)
            const payload = { user_id: id }
            return res.status(200).send({
                authToken: AuthService.createJwt(sub, payload),
        })
    })

module.exports = loginRouter