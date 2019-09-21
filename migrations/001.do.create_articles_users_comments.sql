DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
SET TIME ZONE 'America/Chicago';

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    headline TEXT NOT NULL,
    print TEXT DEFAULT '',
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created DATE NOT NULL
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    comment TEXT NOT NULL
);