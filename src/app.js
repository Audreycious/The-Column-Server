require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const commentsRouter = require('./comments/comments-router')
const articlesRouter = require('./articles/articles-router')
const loginRouter = require('./login/login-router')
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

app.use('/api/login', loginRouter)

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