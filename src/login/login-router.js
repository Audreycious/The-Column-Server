
const express = require('express')

const loginRouter = express.Router()
const jsonBodyParser = express.json()
const LoginService = require('./login-service')
const logger = require('../logger')
const { requireAuth } = require('../auth/authentication')
const AuthService = require('../auth/auth-service')

loginRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        let { id, username, password } = req.user
            const sub = username
            logger.info(sub)
            const payload = { user_id: id }
            return res.status(200).send({
                authToken: AuthService.createJwt(sub, payload),
        })
        .catch(next())
    })

module.exports = loginRouter