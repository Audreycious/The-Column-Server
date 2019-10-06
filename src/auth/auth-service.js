const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('../logger')

const AuthService = {
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
        subject,
        algorithm: 'HS256',
        })
    }
}

module.exports = AuthService
