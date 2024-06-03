import fs from 'fs'
import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { User } from './user.types';

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
      // we should come back to this...
      // if a user is deleted, a new user will have a conflicting id
      // as the users list shrinks, that malforms the length
      // will use uuid dep instead?
      id: existingUsers.length + 1 
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
    const foundUser = existingUsers.find(user => user.id === Number(id))
    if (!foundUser) {
      return next(new Error('User not found'))
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
    const userIndex = existingUsers.findIndex(user => user.id === Number(id))
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
    const userIndex = existingUsers.findIndex(user => user.id === Number(id))
    existingUsers.splice(userIndex, 1)
    saveUsers(existingUsers)
    res.status(204).send('User deleted')
  } catch (err) {
    next(err)
  }
}