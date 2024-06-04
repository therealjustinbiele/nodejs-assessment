import request from 'supertest'
import { describe, test } from '@jest/globals'
import app from '../'

describe('User Module', () => {
    describe('GET /users', () => {
      test('fetches a list of users', async () => {
        const response = await request(app)
        .get('/users')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('users')
      })
    });
    
    describe('GET /users/:id', () => {
      test('fetches a user by id', async () => {
        const response = await request(app)
          .get('/users/1')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('user')
      })
      test('throw if a user is not found', async () => {
        const response = await request(app)
          .get('/users/112233445566')
        expect(response.statusCode).toBe(404)
      })
    });
});