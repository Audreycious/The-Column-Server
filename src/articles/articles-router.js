const express = require('express')
const articlesRouter = express.Router()
const ArticlesService = require('./articles-service')
const bodyParser = express.json()
const uuid = require('uuid/v4')
const logger = require('../logger')
const { requireAuth } = require('../auth/authentication')


articlesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        let knexInstance = req.app.get('db')
        ArticlesService.getAllArticles(knexInstance)
            .then(articles => {
                if (!articles) {
                    return res.status(400).send(`Articles not found`)
                }
                return res.status(200).json(articles)
            })
    })
    .post(bodyParser, (req, res, next) => {
        let knexInstance = req.app.get('db')
        let { id, headline, print, created } = req.body
        let user_id = req.user.id
        let username = req.user.username
        if (!headline) {
            logger.error(`Missing headline`)
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
        if (id == null) {
            id = uuid()
        }

        // TODO: Implement user accounts to send the id with it
        const newArticle = {
            id: id,
            user_id: user_id,
            username: username,
            headline: headline,
            print: print,
            created: created
        }
        logger.info(newArticle)
        ArticlesService.addArticle(knexInstance, newArticle)
            .then(article => {
                return res.status(201).send(article)
            })
    })

module.exports = articlesRouter