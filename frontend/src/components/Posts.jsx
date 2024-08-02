import PostLink from './PostLink'
import { useState } from 'react'
import postService from '../services/posts'
import { useEffect } from 'react'
import '../styling/Posts.css'
import { Grid } from '@mui/material'

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      const posts = await postService.getAll()
      if (posts) {
        setPosts(posts)
      }
    }
    getPosts()
  }, [])

  if (!posts) return <p>Loading...</p>
  console.log(posts)

  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
          <PostLink post={post}/>
        </Grid>
        ))}
    </Grid>
  )
}

export default Posts