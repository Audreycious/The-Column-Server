const express = require('express')
const usersRouter = express.Router()
const UsersService = require('./users-service')
const bodyParser = express.json()
const uuid = require('uuid')
const logger = require('../logger')

usersRouter
    .route('/')
    .get((req, res, next) => {
        // Validate it's a request from an admin
        const apiToken = process.env.SERVER_API_TOKEN
        const authToken = req.get('Authorization')
        if (!authToken || authToken.split(' ')[1] !== apiToken) {
            logger.error(`Unauthorized request to path: api/users${req.path}`)
            return res.status(401).json({ error: 'Unauthorized request' })
        }
        else {
            let knexInstance = req.app.get('db')
            UsersService.getAllUsers(knexInstance)
                .then(users => {
                    if (!users) {
                        return res.status(400).send(`Users not found`)
                    }
                    res.status(200).json(users)
                })
        }
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
        
        // get all the users into an array, then iterate over the array to see if any match the username or email
        UsersService.getAllUsers(knexInstance)
            .then(usersArray => {
                let userMatch = usersArray.find(user => user.username.toLowerCase() == newUser.username.toLowerCase())
                let emailMatch = usersArray.find(user => user.email.toLowerCase() == newUser.email.toLowerCase())
                if (userMatch) {
                    return res.status(400).send({ error: `Username is already taken`})
                }
                else if (emailMatch) {
                    return res.status(400).send({ error: `Email is already registered`})
                }
                else {
                    UsersService.addUser(knexInstance, newUser)
                        .then(response => {
                            return res.status(201).send(response)
                        })
                }
            })
            
        
        
    })

module.exports = usersRouter