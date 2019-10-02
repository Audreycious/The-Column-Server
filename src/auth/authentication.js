const logger = require('../logger')
const bcrypt = require('bcryptjs')

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization')
    const bearerToken = authToken.slice(7, authToken.length)
    let splitBearer = bearerToken.split(":")
    const tokenUsername = splitBearer[0]
    const tokenPassword = splitBearer[1]

    req.app.get('db')('users')
        .where({username: tokenUsername})
        .first()
        .then(user => {
            if (!user) {
                logger.error(`User not found in authentication`)
                return res.status(401).json({error: 'Unauthorized request'})
            }
            return bcrypt.compare(tokenPassword, user.password)
            .then(passwordsMatch => {
            if (!passwordsMatch) {
                logger.error(`Passwords didn't match in authentication`)
                return res.status(401).json({ error: 'Unauthorized request' })
            }

            req.user = user
            next()
            })
        })
        .catch(next)
  }
  
module.exports = {
    requireAuth,
}