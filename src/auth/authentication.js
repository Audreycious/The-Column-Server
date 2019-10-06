const logger = require('../logger')
const bcrypt = require('bcryptjs')

function requireAuth(req, res, next) {
    let bearerToken
    const authToken = req.get('Authorization') || ''
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        logger.info(`Returning at first check`)
        return res.status(401).json({ error: 'Missing bearer token' })
    }
    else {
        bearerToken = authToken.slice('bearer '.length, authToken.length)
    }
    logger.info(bearerToken)
    
    let splitBearer = bearerToken.split(":")
    const tokenUsername = splitBearer[0]
    const tokenPassword = splitBearer[1]
    logger.info(splitBearer)
    logger.info(tokenUsername)
    logger.info(tokenPassword)
    if (!tokenUsername || !tokenPassword) {
        logger.info(`Returning at second check`)
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    let getUser = async () => {
        req.app.get('db')('users')
        .where({username: tokenUsername})
        .first()
        .then(user => {
            logger.info(`User in getUser first`)
            logger.info(user)
            let passwordsMatch = bcrypt.compare(user.password, tokenPassword)
            if (!passwordsMatch) {
                logger.info(`Returning in GetUser`)
                logger.info(user)
                return res.status(401).json({error: 'Unauthorized request'})
            }
            logger.info(user)
            req.user = user 
            next()
        })
    }
    getUser()
}
  
module.exports = {
    requireAuth,
}