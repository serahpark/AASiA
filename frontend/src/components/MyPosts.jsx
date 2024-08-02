import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import postService from '../services/posts'
import PostLink from "./PostLink"
import '../styling/Posts.css'
import { Grid } from "@mui/material"

const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const userId = useSelector(state => state.user?.id)
  useEffect(() => {
    const getPosts = async () => {
      if (userId) {
        const userPosts = await postService.getByUser(userId)
        setPosts(userPosts)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      {posts.length > 0
        ? <Grid container spacing={2}>
            {posts.map(post => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                <PostLink post={post} />
              </Grid>
            ))}
          </Grid>
        : userId
            ? <div>Create a post!</div>
            : <div>You must be logged in to view your posts. Only users with Williams emails are authorized to log in.</div>
      }
    </>
  )
}

export default MyPosts