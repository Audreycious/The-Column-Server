const bcrypt = require('bcryptjs')
const logger = require('../logger')

function requireAuth(req, res, next) {
    let bearerToken
    const authToken = req.get('Authorization') || ''
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Missing bearer token' })
    }
    else {
        bearerToken = authToken.slice('bearer '.length, authToken.length)
    }
    
    let splitBearer = bearerToken.split(":")
    const tokenUsername = splitBearer[0]
    const tokenPassword = splitBearer[1]
    let getUser = async () => {
        req.app.get('db')('users')
        .where({username: tokenUsername})
        .first()
        .then(user => {
            logger.info(user)
            logger.info(user.password)
            logger.info(tokenPassword)
            let passwordsMatch = async () => {return user.password === tokenPassword}
            passwordsMatch().then(match => {
                logger.info(match)
                if (!match) {
                    return res.status(401).json({error: 'Unauthorized request'})
                }
                req.user = user
                next() 
            })
            
        })
    }
    if (!tokenUsername || !tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request' })
    } else {
        getUser()
    }
}
  
module.exports = {
    requireAuth,
}