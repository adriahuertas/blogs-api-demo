import express from 'express';

import Blog from '../models/blog';
import User from '../models/user';
import { userExtractor } from '../utils/middleware';

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });

  res.json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Find user
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    date: new Date(),
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  return res.status(201).json(savedBlog.toJSON());
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const { title, author, url, likes, date } = req.body;

  const blog = {
    title,
    author,
    url,
    likes,
    date,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog.toJSON());
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  // Check if the blog owner is the same as the user making the request
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

export default blogsRouter;
