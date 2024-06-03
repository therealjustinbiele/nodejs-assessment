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

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello World</h1>')
})

app.listen(3000, () => console.log('listening on port 3000'))