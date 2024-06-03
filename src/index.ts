import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from './users/user.controller'

const app = express()

app.route('/users')
  .get(getAllUsers)
  .post(createUser)

app.route('/users/:id')
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser)

app.listen(3000, () => console.log('listening on port 3000'))