const express = require('express')
const usersRouter = express.Router()
const UsersService = require('./users-service')
const bodyParser = express.json()
const uuid = require('uuid')

usersRouter
    .route('/')
    .get((req, res, next) => {
        let knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                if (!users) {
                    return res.status(400).send(`Users not found`)
                }
                res.status(200).json(users)
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
        UsersService.addUser(knexInstance, newUser)
            .then(user => {
                res.status(201).send(user)
            })
        
    })

module.exports = usersRouter