module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/the-column',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://postgres@localhost/the-column-test'
}