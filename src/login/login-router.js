
const express = require('express')

const loginRouter = express.Router()
const jsonBodyParser = express.json()

loginRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        let knexInstance = req.app.get('db')
        let { username, password } = req.body
        logger.info(username)
        logger.info(password)
        knexInstance
            .from('users')
            .select('*')
            .where({ username: username })
            .then(users => {
                logger.info(users)
                let user = users[0]
                if (!user) {
                    return res.status(400).json({ error: `Username not found`})
                }
                else if (user.password !== password) {
                    logger.error(`Invalid password entered for user: ${user.username}`)
                    return res.status(401).json({ error: `Invalid password entered for user: ${user.username}` })
                }
                return res.status(200).json(`${user.username} is now logged in`)
            })
    })

module.exports = loginRouter