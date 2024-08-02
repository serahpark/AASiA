const postsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')
const middleware = require('../utils/middleware')

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).populate('user', { name: 1, googleId: 1, email: 1 })
  response.json(posts)
})

postsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id).populate('user', { name: 1, googleId: 1, email: 1 })
  if (post) {
    response.json(post)
  } else {
    response.status(404).end()
  }
})

postsRouter.get('/user/:userId', async (request, response) => {
  const { userId } = request.params
  const posts = await Post.find({ user: userId })
  response.json(posts)
})

postsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, body, date } = request.body
  const user = request.user
  const post = new Post({
    title,
    body,
    date,
    user: user.id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost.id)
  await user.save()
  response.status(201).json(savedPost)
})

postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  const userId = post.user
  await Post.findByIdAndDelete(request.params.id)
  const user = await User.findById(userId)
  if (user) {
    user.posts = user.posts.filter(postId => postId.toString() !== request.params.id)
  }
  await user.save()
  
  response.status(204).end()
})

postsRouter.put('/:id', async (request, response) => {
  const { title, body, date } = request.body
  const newEntry = { title, body, date }
  const updatedPost = await Post.findByIdAndUpdate(request.params.id, newEntry, { new: true })
  response.json(updatedPost)
})

module.exports = postsRouter