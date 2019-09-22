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
}

module.exports = ArticlesService