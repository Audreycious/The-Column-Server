
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
        let knexInstance = req.app.get('db')
        logger.info(req.user)
        let { username, password } = req.user
        LoginService.getUser(knexInstance, username)
            .then(users => {
                logger.info(users)
                let user = users[0]
                if (!user) {
                    return res.status(400).json({ error: `Username not found`})
                }
                // return LoginService.comparePasswords(user.password, password)
                    // .then(passwordsMatch => {
                        let passwordsMatch = user.password === password
                        if (!passwordsMatch) {
                            logger.error(`Invalid password entered for user: ${user.username}`)
                            return res.status(401).json({ error: `Invalid password entered for user: ${user.username}` })
                        }
                        return res.status(200).json(`${user.username} is now logged in`)
                    // })
                
            })
            .catch(next)
    })

module.exports = loginRouter