import { Link } from '@mui/material'
import { shortenContent, readableDate } from '../utils/utils'
import '../styling/PostLink.css'

const PostLink = ({ post }) => {
  return (
    <div className='postPreview' key={post.id}>
      <Link href={`/community/forum/${post.id}`} underline='none' color='green'>{post.title}</Link>
      <div className='date'>{readableDate(post.date)}</div>
      <div>{shortenContent(post.body)}</div>
    </div>
  )
}

export default PostLink