import express from 'express'

const defaultRoutesRouter = express.Router()

defaultRoutesRouter.get('/', (request, response) => {
  response.send(
    // eslint-disable-next-line comma-dangle
    '<h1>API Blogs</h1><p>This is a demo API build in express. <br>Main endpoint: /api/blogs</p><h3>Author: Adrià Huertas</h3>'
  )
})

export default defaultRoutesRouter
