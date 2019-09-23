const logger = require('../logger')

const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    addUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    validateUserSignup(knex, newUser) {
        knex
            .from('users')
            .where({ username: newUser.username })
            .first()
            .then(user => {
                if (user) {
                    return ({ 
                        status: 400, 
                        error: `Username is already taken` 
                    })
                }
                else {
                    knex
                        .from('users')
                        .where({ email: newUser.email })
                        .first()
                        .then(user => {
                            if (user) {
                                return ({ 
                                    status: 400, 
                                    error: `Email is already taken` 
                                })
                            }
                            else {
                                return ({
                                    status: 201
                                })
                            }
                        })
                }
            })
        }
}

module.exports = UsersService
