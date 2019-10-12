const ArticlesService = {
    getAllArticles(knex) {
        return knex
            .select('*')
            .from('articles')
            .orderBy('created', "desc")
    },
    addArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    useArticleLeft(knex, username) {
        return knex('users')
            .where('username', '=', username)
            .decrement('articlesleft', 1)
    }
}

module.exports = ArticlesService