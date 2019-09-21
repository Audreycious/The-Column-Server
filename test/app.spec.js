const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with response.ok', () => {
    return supertest(app)
      .get('/api/')
      .expect(200)
  })
})