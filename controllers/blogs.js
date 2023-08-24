import express from 'express';
import Blog from '../models/blog';
import User from '../models/user';

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });

  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes, userId } = req.body;

  // Find user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    date: new Date(),
    // eslint-disable-next-line no-underscore-dangle
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

blogsRouter.put('/:id', async (req, res) => {
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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

export default blogsRouter;
