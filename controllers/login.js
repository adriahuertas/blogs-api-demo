import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'

import User from '../models/user'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  // Check if password is correct
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

  return res.status(200).send({ token, username, name: user.name })
})

export default loginRouter
