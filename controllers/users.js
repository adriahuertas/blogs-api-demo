import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser.toJSON());
});

export default usersRouter;
