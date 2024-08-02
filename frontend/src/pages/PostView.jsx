import postService from '../services/posts'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../reducers/postReducer';
import { readableDate } from '../utils/utils';
import '../styling/PostView.css'
import { Typography, Breadcrumbs, Link, Button } from '@mui/material'

const PostView = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [userPosted, setUserPosted] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const getPost = async () => {
      const targetPost = await postService.getById(id)
      setPost(targetPost)
      if (user) {
        setUserPosted(user ? user.id === targetPost.user.id : false)
      }
    }
    getPost()
  }, [user])

  const handleDelete = () => {dispatch(deletePost(id))}

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <Breadcrumbs sx={{
        marginTop: '20px',
      }}>
        <Link underline='hover' color='inherit' href='/community'>
          Community
        </Link>
        <Link underline='hover' color='inherit' href='/community/forum'>
          Forum
        </Link>
        <Typography color='text.primary'>Post</Typography>
      </Breadcrumbs>
      <div className='postHeader'>
        <h2>{post.title}</h2>
        {userPosted &&
          <div className='buttons'>
            <Button href={`/community/forum/edit/${id}`} variant='outlined'>Edit</Button>
            <Button href={'/community/forum'} onClick={handleDelete} variant='outlined'>Delete</Button>
          </div>
        }
      </div>
      <div className='date'>{readableDate(post.date)}</div>
      <div>{post.body}</div>
      {post.userId}
    </div>
  )
}

export default PostView