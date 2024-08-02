import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Breadcrumbs, Link, Typography, Grid, TextField, Button } from "@mui/material"
import dayjs from "dayjs"
import postService from '../services/posts'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { editPost } from "../reducers/postReducer"


const EditPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(dayjs())
  const [now, setNow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadContents = async () => {
      const { title: oldTitle, body: oldBody, date: oldDate } = await postService.getById(id)
      setTitle(oldTitle)
      setBody(oldBody)
      setDate(dayjs(oldDate))
    }

    loadContents()
  }, [])

  const handleEditPost = async (event) => {
    event.preventDefault()
    const editedPost = {
      title,
      body,
      date: now ? new Date() : date.toDate()
    }
    dispatch(editPost(id, editedPost))
    navigate(`/community/forum/${id}`)
  }

  return (
    <div>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/community">
          Community
        </Link>
        <Link underline="hover" color="inherit" href="/community/forum">
          Forum
        </Link>
        <Link underline="hover" color="inherit" href={`/community/forum${id}`}>
          Post
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>
      <h1>Edit Post</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleEditPost}>
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
              <Button type='submit' variant='outlined' color='blue'>Save</Button>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </div>
  )
}

export default EditPost