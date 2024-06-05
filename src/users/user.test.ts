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
        expect(response.body.users).toBeTruthy()
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

    describe('POST /users', () => {
      const newUserData = {
        name: "Clark Kent",
        email: "clark.kent@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345"
        }
      }

      test('creates a new user', async () => {
        const response = await request(app)
          .post('/users')
          .send(newUserData)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('user')
      })

      test('prevents users from signing up twice', async () => {
        const response = await request(app)
          .post('/users')
          .send(newUserData)
        expect(response.statusCode).toBe(409)
      })
    });

    describe('PUT /users/:id', () => {
      const newUserData = {
        name: "Bruce Wayne",
        email: "notbatman@wayneenterprises.com"
      }

      test('updates an existing user by their id', async () => {
        const response = await request(app)
          .put('/users/2')
          .send(newUserData)
        expect(response.statusCode).toBe(204)
      })
    });
    
    describe('DELETE /users/:id', () => {
      test('deletes a user by their id', async () => {
        const response = await request(app)
          .delete('/users/bedd08cc-a433-4237-b932-5e20e6c70c0b')
        expect(response.statusCode).toBe(204)
      })
    });
});