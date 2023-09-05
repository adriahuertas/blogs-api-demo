import express from 'express'

const defaultRoutesRouter = express.Router()

defaultRoutesRouter.get('/', (request, response) => {
  response.send(`
    <h1>API Blogs</h1>
    <p>This is a demo API build in express. <br> 
    Main endpoint: <br>
    /api/blogs<br>
    /api/blogs/id<br>
    /api/users<br>
    /api/users/id</p><h3>Author: Adrià Huertas</h3>
  `)
})

export default defaultRoutesRouter
