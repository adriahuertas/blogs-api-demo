import bcrypt from 'bcrypt'

import Blog from '../models/blog'
import User from '../models/user'

// Dummy blogs for testing

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

// Dummy users
const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    passwordHash: await bcrypt.hash('root', 10),
  },
  {
    username: 'test',
    name: 'Test user',
    passwordHash: await bcrypt.hash('test', 10),
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'author',
    url: 'url',
    likes: 50,
  })
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const initTestDb = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(initialUsers)
  // Get test user id
  const usersAtStart = await usersInDb()
  const user = usersAtStart[1]

  const initialBlogsWithUser = initialBlogs.map((blog) => ({
    ...blog,
    user: user.id,
  }))
  await Blog.insertMany(initialBlogsWithUser)
}

export {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initTestDb,
}
