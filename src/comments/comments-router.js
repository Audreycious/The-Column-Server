const express = require('express')
const commentsRouter = express.Router()
const CommentsService = require('./comments-service')
const bodyParser = express.json()
const uuid = require('uuid/v4')
const logger = require('../logger')
const { requireAuth } = require('../auth/authentication')


commentsRouter
    .route('/')
    .all(requireAuth)
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
        let { id, article_id, user_id, comment } = req.body
        if (!article_id) {
            logger.error(`Missing article_id`)
            return res
                .status(400)
                .json({
                    error: { message: `Sorry, article not available` }
                })
        }
        if (!user_id) {
            logger.error(`Missing user_id`)
            return res
                .status(400)
                .json({
                    error: { message: `Sorry, article not available` }
                })
        }
        if (!comment) {
            logger.error(`Comment is required`)
            return res
                .status(400)
                .json({
                    error: { message: `Comment is required` }
                })
        }
        if (id == null) {
            id = uuid()
        }

        // TODO: Implement user accounts to send the id with it
        const tempUser = "1"
        const newComment = {
            id: id,
            article_id: article_id,
            user_id: tempUser,
            comment: comment
        }
        logger.info(newComment)
        CommentsService.addComment(knexInstance, newComment)
            .then(comment => {
                res.status(201).send(comment)
            })
        
    })

module.exports = commentsRouter