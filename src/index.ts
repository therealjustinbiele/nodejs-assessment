import express, { Request, Response } from 'express'
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
import { validator } from './middleware/validator'

const app = express()

app.use(logger)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator)

app.route('/users')
  .get(getAllUsers)
  .post(createUser)

app.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

app.get('/', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html')
  res.sendFile('/index.html')
})

app.use(errorHandler)

app.listen(process.env.PORT, () => console.log('listening on port 3000'))

export default app
