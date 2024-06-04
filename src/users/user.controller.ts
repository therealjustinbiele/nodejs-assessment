import fs from 'fs'
import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { User } from './user.types'

const usersFilePath = path.join(__dirname, './users.json');

function getUsers(): User[] {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))
}

function saveUsers(users: User[]) {
  fs.writeFileSync(usersFilePath,  JSON.stringify(users, null, 2))
}

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = getUsers()
    res.status(200).send({ users })
  } catch (err) {
    next(err)
  }
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const existingUsers = getUsers()
    const newUser = {
      ...req.body,
      id: uuidv4()
    }

    const conflictingUser = existingUsers.find(user => user.email === req.body.email)
    if (conflictingUser) {
      return next(new Error('User already exists'))
    }

    existingUsers.push(newUser)
    saveUsers(existingUsers)
    res.status(201).send({ user: newUser })
  } catch (err) {
    next(err)
  }
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const existingUsers = getUsers()
    const foundUser = existingUsers.find(user => user.id === String(id))
    if (!foundUser) {
      return next({ status: 404, message: new Error('User not found') })
    }
    res.status(200).send({ user: foundUser })
  } catch (err) {
    next(err)
  }
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const existingUsers = getUsers()
    const userIndex = existingUsers.findIndex(user => user.id === String(id))
    existingUsers[userIndex] = {
      ...existingUsers[userIndex],
      ...req.body
    }
    saveUsers(existingUsers)
    res.status(201).send({ user: existingUsers[userIndex] })
  } catch (err) {
    next(err)
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const existingUsers = getUsers()
    const userIndex = existingUsers.findIndex(user => user.id === String(id))
    existingUsers.splice(userIndex, 1)
    saveUsers(existingUsers)
    res.status(204).send('User deleted')
  } catch (err) {
    next(err)
  }
}