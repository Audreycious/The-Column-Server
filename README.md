The Column
The Column was created as a capstone project to showcase my full-stack skills. The project idea was spawned from the observation that people love being social and enjoy having limitations on the amount of resources they have. The hopes is that The Column will inspire people to create unique articles that everyone around the world can comment on and relate to. Hope you enjoy!

Live Link To The App
https://the-column-app.now.sh/

Screenshot
https://ibb.co/xGxNS8P
https://ibb.co/cJn4SKX

Summary
This app is used for worldwide conversations. Because the user is only allowed 3 articles per year, they feel the limitations and are pressed to use the articles wisely. This will draw out some fascinating content that can be enjoyed by all cultures. Users can sort the articles by most recent or the most popular, sorting them by the most comments.

Built With
HTML
CSS
Javascript
jQuery
Node.js
Express.js
Postgres
DBeaver
Mocha
Chai

How to use this API
Base URL: https://the-column-app.herokuapp.com/api

    Users:
        URL: /users

        Methods:    GET, for admin use

                    POST, to register a new user

                        Params: name=[alphanumeric], required
                                email=[alphanumeric], required
                                username=[alphanumeric], required
                                password=[alphanumeric], required

                        Response body example (201): {
                                                        Name: "name",
                                                        Email: "email",
                                                        Username: "username",
                                                        Password: "password"
                                                                                }

                        Response body example (400): {
                                                        error: "Username is already taken"
                                                                                            }

                        Sample call:    fetch(url/users, {
                                            ContentType: "application/json",
                                            method : "GET",
                                            body: JSON.stringify({
                                                name: "Larry Johnson",
                                                email: "fakeemail@fake.com",
                                                username: "MyUsername",
                                                password: "AStrongPassword"
                                            })
                                        }   


    Articles:
        URL: /articles
        You MUST be logged in or send your credentials as a Bearer Token in the headers to use this endpoint. (e.g. {"Authorization": "Bearer [Username]:[Password]})

        Methods:    GET, to get all the articles and the amount of articles you have remaining
                        
                        Response body example (200): {
                                                        articles: [{}, {}, ...],
                                                        articlesLeft: "3"
                                                                                }

                        Response body example (400): {
                                                        error: "Articles not found"
                                                                                            }

                        Sample call:    fetch(url/articles, {
                                            ContentType: "application/json",
                                            headers: {
                                                Authorization: "Bearer YourBearerToken"
                                            }
                                            method : "GET"
                                        }

                    POST, to write a new article

                        Params: headline=[alphanumeric], required
                                print=[alphanumeric]

                        Response body example (201): {
                                                        id: "someLongUUID",
                                                        user_id: "someLongUUID",
                                                        username: "MyUsername",
                                                        headline: "My headline",
                                                        print: "My print section",
                                                        created: "1997-07-16T19:20:30+01:00"
                                                                                                }

                        Response body example (400): {
                                                        error: "Headline is required"
                                                                                            }

                        Sample call:    fetch(url/articles, {
                                            ContentType: "application/json",
                                            headers: {
                                                Authorization: "Bearer YourBearerToken"
                                            }
                                            method : "POST",
                                            body: JSON.stringify({
                                                headline: "My headline",
                                                print: "My print"
                                            })
                                        }   

    Comments:
        URL: /comments
        You MUST be logged in or send your credentials as a Bearer Token in the headers to use this endpoint. (e.g. {"Authorization": "Bearer [Username]:[Password]})

        Methods:    GET, to get all the comments 
                        
                        Response body example (200): {
                                                        comments: [{}, {}, ...],
                                                                                    }

                        Response body example (400): {
                                                        error: "Comments not found"
                                                                                            }

                        Sample call:    fetch(url/articles, {
                                            ContentType: "application/json",
                                            headers: {
                                                Authorization: "Bearer YourBearerToken"
                                            }
                                            method : "GET"
                                        }

                    POST, to write a new comment

                        Params: article_id=[alphanumeric], required
                                comment=[alphanumeric], required

                        Response body example (201): {
                                                        id: "someLongUUID",
                                                        article_id: "someLongUUID",
                                                        user_id: "someLongUUID",
                                                        username: "MyUsername",
                                                        comment: "My comment"
                                                                                   }

                        Response body example (400): {
                                                        error: "Comment is required"
                                                                                            }

                        Sample call:    fetch(url/articles, {
                                            ContentType: "application/json",
                                            headers: {
                                                Authorization: "Bearer YourBearerToken"
                                            }
                                            method : "POST",
                                            body: JSON.stringify({
                                                article_id: "1b8b5219-67af-4e18-b8fe-63eb4b59e607",
                                                comment: "My comment"
                                            })
                                        }   

    Login:
        URL: /login
        You MUST send your credentials as a Bearer Token in the headers to use this endpoint. (e.g. {"Authorization": "Bearer [Username]:[Password]})

        Methods:    POST, to login
                        Response body example (201): {
                                                        articlesLeft: "3"
                                                                            }

                        Response body example (400): {
                                                        error: "Username not found"
                                                                                            }

                        Sample call:    fetch(url/login, {
                                            ContentType: "application/json",
                                            headers: {
                                                Authorization: "Bearer YourBearerToken"
                                            }
                                            method : "POST"
                                        }   

Frontend
This app uses The Column, built with React, at https://the-column-app.now/sh/

Author
Audrey Foss - Kingfisher WebDev (https://audreycious.github.io/Portfolio/)

Acknowledgments
Thank you to my wife for your constant support
