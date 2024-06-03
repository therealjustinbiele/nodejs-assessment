import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { User } from './user.types';

const usersFilePath = path.join(__dirname, './users.json');

function getUsers(): User[] {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = getUsers()
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err)
  }
}
export async function createUser(req: Request, res: Response) {
  try {
    const existingUsers = getUsers()
    const newUser = {
      ...req.body,
      // we should come back to this...
      // if a user is deleted, a new user will have 
      id: existingUsers.length + 1 
    }

    const conflictingUser = existingUsers.find(user => user.email === req.body.email)
    if (conflictingUser) {
      return res.status(400).send('User exists with that email address')
    }

    existingUsers.push(newUser)
    res.status(201).send(newUser)
  } catch (err) {
    throw new Error('Error')
  }
}
export async function getUserById(req: Request, res: Response) {
  try {

  } catch (err) {

  }
}
export async function updateUser(req: Request, res: Response) {
  try {

  } catch (err) {

  }
}
export async function deleteUser(req: Request, res: Response) {
  try {

  } catch (err) {

  }
}