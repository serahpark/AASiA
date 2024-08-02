import { GoogleLogin } from '@react-oauth/google'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginSuccess, handleLogOut, getStoredUser } from '../reducers/userReducer';
import { Box, Link, Grid } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getStoredUser())
  }, [])

  return (
    <div>
      {user
        // ? <Grid container alignItems='center' spacing={1}>
        //     <Grid item xs={8} md='auto'>
        //       <Box sx={{ padding: '8px 24px', }}>Welcome, {user.name}!</Box>
        //     </Grid>
        //     <Grid item xs={4} md='auto'>
        //       <Box sx={{
        //         padding: '8px 24px',
        //         borderLeft: { xs: 'none', md: '1px solid rgba(168, 168, 168)' },
        //         borderRight: { xs: 'none', md: '1px solid rgba(168, 168, 168)' },
        //         transition: 'background-color 0.3s ease',
        //         cursor: 'pointer',
        //         '&:hover': {
        //           backgroundColor: 'rgba(168, 168, 168, 0.3)'
        //         },
        //         width: { xs: '100%', md: 'auto'}
        //       }} onClick={() => dispatch(handleLogOut())}>
        //         <Box sx={{ padding: '8px 16px' }}>
        //           Logout
        //         </Box>
        //       </Box>
        //     </Grid>
        //   </Grid>



        ? <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ padding: '8px 24px', }}>Welcome, {user.name}!</Box>
            <Box
              sx={{
                padding: '8px 24px',
                borderLeft: { xs: 'none', md: '1px solid rgba(168, 168, 168)' },
                borderRight: { xs: 'none', md: '1px solid rgba(168, 168, 168)' },
                borderTop: { xs: '1px solid rgba(168, 168, 168)', sm: 'none' },
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(168, 168, 168, 0.3)'
                },
                width: { xs: '100%', md: 'auto'}
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
    <Box sx={{ display: 'flex', flexWrap: 'wrap'
     }}>
      {[
        { link: '/', label: 'Home'},
        { link: '/about', label: 'About'},
        { link: '/community/forum', label: 'Community'},
        { link: '/action', label: 'Action'}
      ].map((section, index) => (
        <Box key={index} sx={{
          padding: '8px 24px',
          borderLeft: { xs: 'none', md: '1px solid rgba(168, 168, 168)' },
          borderRight: { xs: 'none', sm: '1px solid rgba(168, 168, 168)', md: 'none' },
          borderBottom: { xs: '1px solid rgba(168, 168, 168)', md: 'none' },
          transition: 'background-color 0.3s ease',
          '&:hover': { backgroundColor: 'rgba(168, 168, 168, 0.3)' },
          width: { xs: '100%', md: 'auto' }
        }}>
          <Link href={section.link} underline='none' color='blue'>{section.label}</Link>
        </Box>
      ))}
    </Box>
    <Login />
  </div>
)}

export default Navbar