const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('posts', { title: 1, body: 1, date: 1})
  response.json(users)
})

module.exports = usersRouter