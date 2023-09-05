import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'express-async-errors'

import * as config from './utils/config'
import blogsRouter from './controllers/blogs'
import usersRouter from './controllers/users'
import defaultRoutesRouter from './controllers/defaultRoutes'
import loginRouter from './controllers/login'
import * as middleware from './utils/middleware'
import * as logger from './utils/logger'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/', defaultRoutesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
