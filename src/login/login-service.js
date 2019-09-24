
const bcrypt = require('bcryptjs')

const LoginService = {
    getUser(knex, username) {
        return knex
            .from('users')
            .select('*')
            .where({ username: username })
    }, 
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
}

module.exports = LoginService