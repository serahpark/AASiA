const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try { 
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID
    })
    console.log("ticket payload:", ticket.getPayload())
    const { sub: googleId, name, email } = ticket.getPayload()

    let user = await User.findOne({ googleId })
    if (!user) {
      user = new User({
        googleId,
        email,
        name
      })
      await user.save()
    }

    request.user = user
    next()
  } catch (error) {
    response.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
}