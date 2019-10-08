
const express = require('express')

const loginRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../auth/authentication')

loginRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
       
        return res.status(200).json({articlesLeft: req.user.articlesleft})
    })

module.exports = loginRouter