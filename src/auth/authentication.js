const logger = require('../logger')

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

    if (!tokenUsername || !tokenPassword) {
        logger.info(`Returning at second check`)
        return res.status(401).json({ error: 'Unauthorized request' })
    }

    req.app.get('db')('users')
        .where({username: tokenUsername})
        .first()
        .then(user => {
            if (!user || user.password !== tokenPassword) {
                return res.status(401).json({error: 'Unauthorized request'})
            }
            req.user = user
            next()
        })
        .catch(next)
  }
  
module.exports = {
    requireAuth,
}