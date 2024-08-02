import { GoogleLogin } from '@react-oauth/google'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginSuccess, handleLogOut, getStoredUser } from '../reducers/userReducer';
import { Box, Link } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getStoredUser())
  }, [])

  return (
    <div>
      {user
        ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ padding: '8px 24px', }}>
              Welcome, {user.name}!
            </Box>
            <Box
              sx={{
                padding: '8px 24px',
                borderLeft: '1px solid rgba(168, 168, 168)',
                borderRight: '1px solid rgba(168, 168, 168)',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(168, 168, 168, 0.3)'
                },
              }} onClick={() => dispatch(handleLogOut())}
            >
              Logout
            </Box>
          </Box>
        : <GoogleLogin onSuccess={(res) => dispatch(handleLoginSuccess(res))} onError={() => {console.log('Login Failed');}}
      />
      }
    </div>
  )
}

const Navbar = () => {
  return (
  <div className='main nav'>
    <Box sx={{ display: 'flex' }}>
      {[
        { link: '/', label: 'Home'},
        { link: '/about', label: 'About'},
        { link: '/community/forum', label: 'Community'},
        { link: '/action', label: 'Action'}
      ].map((section, index) => (
        <Box key={index} sx={{
          padding: '8px 24px',
          borderLeft: '1px solid rgba(168, 168, 168)',
          transition: 'background-color 0.3s ease',
          '&:hover': { backgroundColor: 'rgba(168, 168, 168, 0.3)' }
        }}>
          <Link href={section.link} underline='none' color='blue'>{section.label}</Link>
        </Box>
      ))}
    </Box>
    <Login />
  </div>
)}

export default Navbar