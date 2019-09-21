

function makeUsersArray() {
    return [
        {id: '1', name: 'Audrey', email: 'Porcupine4@gmail.com', username: 'Audrey', password: 'Audrey'},
        {id: '2', name: 'Danielle', email: 'meercatnip@gmail.com', username: 'Danielle', password: 'Danielle'},
    ]
}

function makeArticlesArray() {
    return [
        {created: '2019-01-01T06:00:00.000Z', id: '1', headline: 'Ink me up!!', print: 'What should I get for my next tattoo?', user_id: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '2', headline: 'The cowboys are the worst team of all possible sports teams', print: 'Fight me if you disagree', user_id: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '3', headline: 'Cloning for everyone', print: "I don't think it's controversial at all and we should all have at least 10 of us", user_id: '2'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '4', headline: 'What should I name my baby?', print: "I think it's going to be a boy, but not sure. Whats a good name? I like things that start with L, K, and J", user_id: '1'}, 
        {created: '2019-01-01T06:00:00.000Z', id: '5', headline: "AMA", print: "I'm a millionaire child surgeon who invented a new type of heart surgery. AMA", user_id: '2'}
    ]
}

function makeCommentsArray() {
    return [{id: '1', article_id: '1', user_id: '1', comment: 'A spider!'}, 
    {id: '2', article_id: '1', user_id: '2', comment: 'Something dumb!'},
    {id: '3', article_id: '1', user_id: '2', comment: "Idk, I'm nervous!"},
    {id: '4', article_id: '2', user_id: '1', comment: "I'll fight you!"},
    {id: '5', article_id: '2', user_id: '2', comment: "It's definitely the Eagles"},
    {id: '6', article_id: '3', user_id: '1', comment: 'I already have 3!'},
    {id: '7', article_id: '3', user_id: '1', comment: 'This is strange...'}, 
    {id: '8', article_id: '3', user_id: '2', comment: 'Are you a cloning scientist?'},
    {id: '9', article_id: '4', user_id: '1', comment: 'How about LaKingJa?'},
    {id: '10', article_id: '4', user_id: '1', comment: 'Leon!'},
    {id: '11', article_id: '4', user_id: '2', comment: 'Kyal'},
    {id: '12', article_id: '4', user_id: '2', comment: 'Jason!'},
    {id: '13', article_id: '4', user_id: '2', comment: 'You gotta pick Julion'},
    {id: '14', article_id: '5', user_id: '2', comment: 'So are you a child who is a surgeon?'},
    {id: '15', article_id: '5', user_id: '1', comment: 'No, I do surgery on children'},
    {id: '16', article_id: '5', user_id: '2', comment: "And you're a child?"},
    {id: '17', article_id: '5', user_id: '1', comment: 'That is beside the point, stop asking'},
    {id: '18', article_id: '5', user_id: '2', comment: 'Is that a yes???'}]
    
}

module.exports = {
    makeUsersArray,
    makeArticlesArray,
    makeCommentsArray
}