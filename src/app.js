require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const commentsRouter = require('./comments/comments-router')
const articlesRouter = require('./articles/articles-router')
const bodyParser = express.json()
const logger = require('./logger')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/api', (req, res) => {
    res.status(200).send()
})
app.use('/api/users', usersRouter)

app.use('/api/articles', articlesRouter)

app.use('/api/comments', commentsRouter)

app.post('/api/login', bodyParser, (req, res, next) => {
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
            // let filteredUser = users.filter(user => {
            //     user.username.toLowerCase() === username.toLowerCase()
            // })
            let user = users[0]
            // let userPassword = user.password
            // let userUsername = user.username
            // logger.info(userPassword)
            // logger.info(userUsername)
            if (!user) {
                return res.status(400).json({ error: `Username not found`})
            }
            else if (user.password !== password) {
                logger.error(`Invalid password entered for user: ${user.username}`)
                return res.status(401).json({ error: `Invalid password entered for user: ${user.username}` })
            }
            // logger.info(user)
            return res.status(200).json(`${user.username} is now logged in`)
        })
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app