require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')

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

app.get('/api/articles', (req, res) => {
    let knexInstance = req.app.get('db')
    knexInstance.select('*').from('articles').then(articles => {
        res.status(200).json(articles)
    })
})

app.get('/api/comments', (req, res) => {
    let knexInstance = req.app.get('db')
    knexInstance.select('*').from('comments').then(comments => {
        res.status(200).send(comments)
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