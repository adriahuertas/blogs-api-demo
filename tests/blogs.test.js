import * as listHelper from '../utils/list_helper'

// Dummy blogs for testing
const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, equals null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals the blog itself', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })

  test('when list has many blogs, equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('when list is empty, equals null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals the author of that', () => {
    const result = listHelper.mostBlogs([blogs[0]])
    expect(result).toEqual({ author: blogs[0].author, blogs: 1 })
  })

  test('when list has many blogs, equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list is empty, equals null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals the author of that', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({ author: blogs[0].author, likes: 7 })
  })

  test('when list has many blogs, equals the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
