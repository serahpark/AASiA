import EditPost from './EditPost'
import Forum from './Forum'
import PostView from './PostView'
import { Routes, Route } from 'react-router-dom'

const Community = () => {
  return (
    <Routes>
      <Route path='forum/' element={<Forum />} />
      <Route path='forum/:id' element={<PostView />} />
      <Route path='forum/edit/:id' element={<EditPost />} />
    </Routes>
  )
}

export default Community