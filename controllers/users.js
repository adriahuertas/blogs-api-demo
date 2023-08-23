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
  const { username, name, password, notes } = req.body;
  console.log(req.body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    notes,
  });

  const savedUser = await user.save();
  res.json(savedUser.toJSON());
});

export default usersRouter;
