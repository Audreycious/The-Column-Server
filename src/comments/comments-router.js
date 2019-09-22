const express = require('express')
const commentsRouter = express.Router()
const CommentsService = require('./comments-service')
const bodyParser = express.json()
const uuid = require('uuid')

commentsRouter
    .route('/')
    .get((req, res, next) => {
        let knexInstance = req.app.get('db')
        CommentsService.getAllComments(knexInstance)
            .then(comments => {
                if (!comments) {
                    return res.status(400).send(`Comments not found`)
                }
                res.status(200).json(comments)
            })
    })
    .post(bodyParser, (req, res, next) => {
        let knexInstance = req.app.get('db')
        let { name, email, username, password } = req.body
        if (!name) {
            logger.error(`Name is required`)
            return res
                .status(400)
                .json({
                    error: { message: `Name is required` }
                })
        }
        if (!email) {
            logger.error(`Email is required`)
            return res
                .status(400)
                .json({
                    error: { message: `Email is required` }
                })
        }
        if (!username) {
            logger.error(`Username is required`)
            return res
                .status(400)
                .json({
                    error: { message: `Username is required` }
                })
        }
        if (!password) {
            logger.error(`Password is required`)
            return res
                .status(400)
                .json({
                    error: { message: `Password is required` }
                })
        }
        const id = uuid()
        const newUser = {
            id: id,
            name: name,
            email: email,
            username: username,
            password: password
        }
        CommentsService.addUser(knexInstance, newUser)
            .then(user => {
                res.status(201).send(user)
            })
        
    })

module.exports = commentsRouter