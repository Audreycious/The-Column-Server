
const bcrypt = require('bcryptjs')
const logger = require('../src/logger')

function makeUsersArray() {
    return [
        {id: '0', name: 'Admin', email: 'Admin@gmail.com', username: 'Admin', password: 'Admin'},
        {id: '1', name: 'Audrey', email: 'Porcupine4@gmail.com', username: 'Audrey', password: 'Audrey'},
        {id: '2', name: 'Danielle', email: 'meercatnip@gmail.com', username: 'Danielle', password: 'Danielle'},
    ]
}

function makeArticlesArray() {
    return [
        {created: '2019-01-01T06:00:00.000Z', id: '1', headline: 'Ink me up!!', print: 'What should I get for my next tattoo?', user_id: '1', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '2', headline: 'The cowboys are the worst team of all possible sports teams', print: 'Fight me if you disagree', user_id: '1', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '3', headline: 'Cloning for everyone', print: "I don't think it's controversial at all and we should all have at least 10 of us", user_id: '2', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '4', headline: 'What should I name my baby?', print: "I think it's going to be a boy, but not sure. Whats a good name? I like things that start with L, K, and J", user_id: '1', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '5', headline: "AMA", print: "I'm a millionaire child surgeon who invented a new type of heart surgery. AMA", user_id: '2', username: '1', usernumarticles: '1', usernumcomments: '1'}
    ]
}

function makeCommentsArray() {
    return [{id: '1', article_id: '1', user_id: '1', comment: 'A spider!', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
    {id: '2', article_id: '1', user_id: '2', comment: 'Something dumb!', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '3', article_id: '1', user_id: '2', comment: "Idk, I'm nervous!", username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '4', article_id: '2', user_id: '1', comment: "I'll fight you!", username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '5', article_id: '2', user_id: '2', comment: "It's definitely the Eagles", username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '6', article_id: '3', user_id: '1', comment: 'I already have 3!', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '7', article_id: '3', user_id: '1', comment: 'This is strange...', username: '1', usernumarticles: '1', usernumcomments: '1'}, 
    {id: '8', article_id: '3', user_id: '2', comment: 'Are you a cloning scientist?', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '9', article_id: '4', user_id: '1', comment: 'How about LaKingJa?', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '10', article_id: '4', user_id: '1', comment: 'Leon!', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '11', article_id: '4', user_id: '2', comment: 'Kyal', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '12', article_id: '4', user_id: '2', comment: 'Jason!', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '13', article_id: '4', user_id: '2', comment: 'You gotta pick Julion', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '14', article_id: '5', user_id: '2', comment: 'So are you a child who is a surgeon?', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '15', article_id: '5', user_id: '1', comment: 'No, I do surgery on children', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '16', article_id: '5', user_id: '2', comment: "And you're a child?", username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '17', article_id: '5', user_id: '1', comment: 'That is beside the point, stop asking', username: '1', usernumarticles: '1', usernumcomments: '1'},
    {id: '18', article_id: '5', user_id: '2', comment: 'Is that a yes???', username: '1', usernumarticles: '1', usernumcomments: '1'}]
}

function prepUsers(users) {
    let preppedUsers
    if (users.length > 1) {
        preppedUsers = users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 12)
        }))
    } else {
        users.password = bcrypt.hashSync(users.password, 12)
        preppedUsers = users
    }
    return preppedUsers
}

function seedUsers(db, users) {
    const preppedUsers = prepUsers(users)
    return db.into('users').insert(preppedUsers)
}


module.exports = {
    makeUsersArray,
    makeArticlesArray,
    makeCommentsArray,
    seedUsers,
    prepUsers
}