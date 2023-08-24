import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    date: 1,
  });
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  // Check password length
  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Password must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();
  return res.json(savedUser.toJSON());
});

export default usersRouter;
