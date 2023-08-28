import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../app';
import Blog from '../models/blog';
import User from '../models/user';
import * as helper from './test_helper';

const api = supertest(app);

// beforeEach(async () => {
//   // Blog API init
//   await User.deleteMany({});
//   await User.insertMany(helper.initialUsers);
//   // Get id test user
//   const usersAtStart = await helper.usersInDb();
//   const user = usersAtStart[1];

//   const initialBlogs = helper.initialBlogs.map((blog) => ({
//     ...blog,
//     user: user.id,
//   }));
//   await Blog.deleteMany({});
//   await Blog.insertMany(initialBlogs);
// });
beforeEach(async () => {
  await helper.initTestDb();
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('React patterns');
  });
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    // Get a valid user
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[1];
    // Get token for user
    const res = await api
      .post('/api/login')
      .send({ username: user.username, password: 'test' });

    // eslint-disable-next-line no-underscore-dangle
    const { token } = res._body;

    const newBlog = {
      title: 'Creating a blog with React',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-1-4-2',
      likes: 0,
      userId: user.id,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain('Creating a blog with React');
  });

  test('fails with status code 400 if data invalid', async () => {
    // Get a valid user
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[1];
    // Get token for user
    const res = await api
      .post('/api/login')
      .send({ username: user.username, password: 'test' });
    // eslint-disable-next-line no-underscore-dangle
    const { token } = res._body;
    const newBlog = {
      title: 'New blog',
      date: new Date(),
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  // Get test user token
  let token, username, id;
  beforeAll(async () => {
    // Get a valid user
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[1];
    // Get token for user
    const res = await api
      .post('/api/login')
      .send({ username: user.username, password: 'test' });
    // eslint-disable-next-line no-underscore-dangle
    token = res._body.token;
    // eslint-disable-next-line no-underscore-dangle
    username = res._body.username;
    console.log(res._body);
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[2];
    console.log(blogToDelete);
    console.log(`bearer ${token}`);
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  // Get test user token
  let token;
  beforeAll(async () => {
    // Get a valid user
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[1];
    // Get token for user
    const res = await api
      .post('/api/login')
      .send({ username: user.username, password: 'test' });
    // eslint-disable-next-line no-underscore-dangle
    token = res._body.token;
  });
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 15,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.likes).toBe(blogsAtEnd[0].likes);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 15,
    };

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.likes).not.toBe(blogsAtEnd[0].likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
