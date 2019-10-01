const logger = require('../logger')
const bcrypt = require('bcryptjs')

function requireAuth(req, res, next) {
    // let bearerToken
    // const authToken = req.get('Authorization') || ''
    // if (!authToken.toLowerCase().startsWith('bearer ')) {
    //     logger.info(`Returning at first check`)
    //     return res.status(401).json({ error: 'Missing bearer token' })
    // }
    // else {
    //     bearerToken = authToken.slice('bearer '.length, authToken.length)
    // }
    // logger.info(bearerToken)
    
    // let splitBearer = bearerToken.split(":")
    // const tokenUsername = splitBearer[0]
    // const tokenPassword = splitBearer[1]
    // logger.info(splitBearer)
    // logger.info(tokenUsername)
    // logger.info(tokenPassword)
    // if (!tokenUsername || !tokenPassword) {
    //     logger.info(`Returning at second check`)
    //     return res.status(401).json({ error: 'Unauthorized request' })
    // }

    for (const [key, value] of Object.entries(loginUser))
        if (value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            })

    req.app.get('db')('users')
        .where({username: tokenUsername})
        .first()
        .then(user => {
            if (!user) {
                logger.error(`User not found in authentication`)
                return res.status(401).json({error: 'Unauthorized request'})
            }
            logger.info(user)
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