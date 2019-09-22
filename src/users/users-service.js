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
}

module.exports = UsersService