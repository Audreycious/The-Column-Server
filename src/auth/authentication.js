const logger = require('../logger')
const bcrypt = require('bcryptjs')

function requireAuth(req, res, next) {
    logger.info(req.body)
    let { username, password } = req.body 
    let knexInstance = req.app.get('db')
    knexInstance
        .from('users')
        .where({username: username})
        .first()
        .then(user => {
            if (!user) {
                logger.error(`User not found in authentication`)
                return res.status(401).json({error: 'Unauthorized request'})
            }
            let passwordsMatch = bcrypt.compare(password, user.password)
            if (!passwordsMatch) {
                logger.error(`Passwords didn't match in authentication`)
                return res.status(401).json({ error: 'Unauthorized request' })
            }
            logger.info(`user in authentication`)
            logger.info(user)
            req.user = user
            next()   
        })
}
  
module.exports = {
    requireAuth,
}