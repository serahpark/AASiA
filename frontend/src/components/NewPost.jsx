import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../reducers/postReducer'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Button } from '@mui/material'

const NewPost = ({ handleSubmit }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(dayjs())

  const addNewPost = async (event) => {
    event.preventDefault()
    const newPost = {
      title,
      body,
      date: date.toDate()
    }
    dispatch(createPost(newPost))
    navigate('/community/forum')
    handleSubmit('posts')
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={addNewPost}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <TextField label='Title' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} color='blue'/>
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker label='Date' value={date} onChange={(newDate) => setDate(newDate)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Body' fullWidth multiline minRows={5} value={body} onChange={(e) => setBody(e.target.value)} color='blue'/> 
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='outlined' color='blue'>Post</Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  )
}

export default NewPost