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
        let articlesleft = req.user.articlesleft
        ArticlesService.getAllArticles(knexInstance)
            .then(articles => {
                if (!articles) {
                    return res.status(400).send(`Articles not found`)
                }
                return res.status(200).json({articles: articles, articlesLeft: articlesleft})
            })
    })
    .post(bodyParser, (req, res, next) => {
        let knexInstance = req.app.get('db')
        let { id, headline, print, created } = req.body.article
        let user_id = req.user.id
        let username = req.user.username

        if (!headline) {
            return res
                .status(400)
                .json({
                    error: { message: `Headline is required` }
                })
        }
        if (!user_id) {
            logger.error(`Missing user_id`)
            return res
                .status(400)
                .json({
                    error: { message: `User Id is missing` }
                })
        }
        
        if (id == null) {
            id = uuid()
        }

        ArticlesService.useArticleLeft(knexInstance, username)
            .then(user => {
                return `do nothing`
            })

        const newArticle = {
            id: id,
            user_id: user_id,
            username: username,
            headline: headline,
            print: print,
            created: created
        }
        ArticlesService.addArticle(knexInstance, newArticle)
            .then(article => {
                return res.status(201).send(article)
            })
    })

module.exports = articlesRouter