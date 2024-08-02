import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth'
import postService from '../services/posts'
import { googleLogout } from '@react-oauth/google'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  }
})

export const handleLoginSuccess = (response) => {
  return async dispatch => {
    const token = response.credential
    try {
      const authUser = await authService.sendToken(token)
      const userData = {
        user: authUser.user,
        token
      }
      window.localStorage.setItem('storedUser', JSON.stringify(userData))
      postService.setToken(token)
      dispatch(setUser(authUser.user))
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

export const getStoredUser = () => {
  return async dispatch => {
    const storedUserJSON = window.localStorage.getItem('storedUser')
    if (storedUserJSON) {
      const parsedUser = JSON.parse(storedUserJSON)
      dispatch(setUser(parsedUser.user))
      postService.setToken(parsedUser.token)
    }
  }
}

export const handleLogOut = () => {
  return async dispatch => {
    googleLogout()
    window.localStorage.removeItem('storedUser')
    dispatch(setUser(null))
  }
}

export const { setUser, addUserPost, removeUserPost } = userSlice.actions
export default userSlice.reducer