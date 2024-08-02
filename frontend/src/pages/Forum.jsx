import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializePosts } from "../reducers/postReducer";
import NewPost from "../components/NewPost"
import Posts from "../components/Posts"
import MyPosts from "../components/MyPosts";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const TabView = () => {
  const [value, setValue] = useState('posts');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializePosts())
  }, [])

  const handleChange = (event, newValue) => {setValue(newValue)};

  const user = useSelector(state => state.user)

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="All posts" value="posts" />
            <Tab label="Create new post" value="new" />
            <Tab label="My posts" value="mine" />
          </TabList>
        </Box>
        <TabPanel value="posts">
          <Posts/>
        </TabPanel>
        <TabPanel value="new">
          {user
            ? <NewPost handleSubmit={setValue} />
            : <>You must be logged in to post on the forum. Only users with Williams emails are authorized to log in.</>
          }
        </TabPanel>
        <TabPanel value="mine">
          <MyPosts />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

const Forum = () => {
  return (
    <div>
      <h2>Forum</h2>
      <div>View Record articles, resources, and archival materials from AASiA, and feel free to share resources and content you&apos;ve created or would like to share with the community!</div>
      <TabView />
    </div>
  )
}

export default Forum