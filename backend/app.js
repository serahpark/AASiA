const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const postsRouter = require('./controllers/posts')
const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use(middleware.errorHandler)

module.exports = app