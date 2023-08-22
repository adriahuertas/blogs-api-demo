# API BLOGS

This is an API demo made with JavaScript/Express

## Features:

- Eslint: airbnb style
- Nodemon as development dependency
- Version control with GIT/GITHUB
- Deployed using render.com. [Check it out!](https://blog-api-demo.onrender.com/)
- MongoDB storage deployed in the cloud (mongodb.com/atlas)
- Unit and integration testing with Jest
- Folder structure:
  - Controllers
  - Models
  - Tests
  - Utils

## End Points:

- /: Hello world
- /api/blogs
- /api/blogs/id

## To run

npm start

## Deploy

You can check the deployed version in render https://blog-api-demo.onrender.com/

## To install

After forking this repo, you need to create .env file to define PORT and MONGODB_URI constants.

## To test

- All tests: npm test
- Test a file: npm test -- file. Example: npm test -- tests/blog_api.test.js
- Run one test: npm test -- -t 'test'. Example: npm test -- -t 'a specific blog is within the returned notes'
