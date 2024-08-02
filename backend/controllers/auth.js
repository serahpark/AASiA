const authRouter = require('express').Router()
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID)

const createSessionToken = (user) => {
  return jwt.sign({ id: user.googleId, email: user.email }, process.env.GOOGLE_AUTH_CLIENT_SECRET)
}

authRouter.post('/', async (req, res) => {
  const { token } = req.body

  try { 
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID
    })
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

    const sessionToken = createSessionToken(user)
    res.status(201).json({ sessionToken, user })

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

module.exports = authRouter