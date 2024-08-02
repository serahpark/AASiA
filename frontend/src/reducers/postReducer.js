import { createSlice } from '@reduxjs/toolkit'
import postService from '../services/posts'

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload
    },
    appendPost(state, action) {
      state.push(action.payload)
    },
    removePost(state, action) {
      return state.filter(post => post.id !== action.payload)
    },
    updatePost(state, action) {
      const { id, edited } = action.payload
      return state.map(post => post.id !== id ? post : edited)
    }
  }
})

export const initializePosts = () => {
  return async dispatch => {
    const posts = await postService.getAll()
    dispatch(setPosts(posts))
  }
}

export const createPost = content => {
  return async dispatch => {
    const newPost = await postService.createNew(content)
    console.log('posted newPost', newPost)
    dispatch(appendPost(newPost))
  }
}

export const deletePost = id => {
  return async dispatch => {
    const deleted = await postService.remove(id)
    dispatch(removePost(deleted))
  }
}

export const editPost = (id, edited) => {
  return async dispatch => {
    console.log("editPost id", id, typeof(id))
    console.log("editPost content", edited, typeof(edited))
    const updated = await postService.update(id, edited)
    dispatch(updatePost({ id, editedPost: updated }))
  }
}

export const { setPosts, appendPost, removePost, updatePost } = postSlice.actions
export default postSlice.reducer