import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from './users/user.controller'
import { errorHandler } from './middleware/errors'
import { logger } from './middleware/logger'

const app = express()

app.use(logger)
app.use(express.static('public'))
app.use(bodyParser.json())

app.route('/users')
  .get(getAllUsers)
  .post(createUser)

app.route('/users/:id')
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser)

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile('/index.html')
})

app.use(errorHandler)

app.listen(3000, () => console.log('listening on port 3000'))