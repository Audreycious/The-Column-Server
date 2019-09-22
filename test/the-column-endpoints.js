const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray, makeArticlesArray, makeCommentsArray } = require('./the-column.fixtures')

describe('The Column endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })
    before('set the timezone', () => {
        return db.raw("SET timezone to 'America/Chicago'")
    })
    before('clean the table', function() {
        return db.raw('TRUNCATE comments, articles, users RESTART IDENTITY CASCADE') 
    })

    afterEach('cleanup',function() {
        return db.raw('TRUNCATE comments, articles, users RESTART IDENTITY CASCADE')
    })

    after('disconnect from db', () => db.destroy())

    describe('/api/users endpoints', () => {
        describe('GET /api/users', () => {
            context(`Given no users`, function() {
                it('responds with 200 and an empty list', () => {
                    return supertest(app)
                        .get('/api/users')
                        .expect(200, [])       
                })
            })        
            context(`Given there are users in the database`, function() {
                let testUsers = makeUsersArray()
                beforeEach('insert users', function() {
                    return db
                        .into('users')
                        .insert(testUsers)
                })
                it('responds with 200 and an array of testUsers', function() {
                    return supertest(app)
                        .get('/api/users')
                        .expect(200, testUsers)
                });         
            })
        })
        describe('POST /api/users', () => {
            it('creates a user, responding with 201 and the new user', () => {
                return supertest(app)
                    .post('/api/users')
                    .send({
                        name: 'Cowlina',
                        email: 'luv4treats@meow.com',
                        username: 'luv4treats',
                        password: 'meow'
                    })
                    .expect(201)       
            })
        })   
    })

    describe('GET /api/articles', () => {
        context(`Given no articles`, function() {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/articles')
                    .expect(200, [])       
            })
        })        
        context(`Given there are articles in the database`, function() {
            let testUsers = makeUsersArray()
            let testArticles = makeArticlesArray()
            beforeEach('insert users and articles', function() {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                        .into('articles')
                        .insert(testArticles)
                })
            })
            it('responds with 200 and an array of testArticles', function() {
                return supertest(app)
                    .get('/api/articles')
                    .expect(200, testArticles)
            });
                        
        })
    })
    describe('/api/comments endpoints', () => {
        describe('GET /api/comments', () => {
            context(`Given no comments`, function() {
                it('responds with 200 and an empty list', () => {
                    return supertest(app)
                        .get('/api/comments')
                        .expect(200, [])       
                })
            })        
            context(`Given there are comments in the database`, function() {
                let testUsers = makeUsersArray()
                let testArticles = makeArticlesArray()
                let testComments = makeCommentsArray()
                beforeEach('insert users, articles, and comments', function() {
                    return db
                        .into('users')
                        .insert(testUsers)
                        .then(() => {
                            return db
                            .into('articles')
                            .insert(testArticles)
                            .then(() => {
                                return db
                                    .into('comments')
                                    .insert(testComments)
                            })
                    })
                })
                it('responds with 200 and an array of testComments', function() {
                    return supertest(app)
                        .get('/api/comments')
                        .expect(200, testComments)
                });
                            
            })
        })
        describe('POST /api/comments', () => {
            let testUsers = makeUsersArray()
            let testArticles = makeArticlesArray()
            let testComments = makeCommentsArray()
            beforeEach('insert users, articles, and comments', function() {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                        .into('articles')
                        .insert(testArticles)
                        .then(() => {
                            return db
                                .into('comments')
                                .insert(testComments)
                        })
                })
            })
            it('creates a comment, responding with 201 and the new comment', () => {
                let testComment = {
                    id: '999999999999999',
                    article_id: '1',
                    user_id: '1',
                    comment: "That's a great idea!"
                }
                return supertest(app)
                    .post('/api/comments')
                    .send(testComment)
                    .expect(201, testComment)       
            })
        })
    })
})

// headline: 'Cowlina delays feeding time voluntarily!',
// print: 'This old cat can be taught. Come see the amazing cat with human-like cognitive function!'