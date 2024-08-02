import { Button, Grid } from "@mui/material"
import aasm from "../assets/aasm.jpg"
import picnic from "../assets/picnic.jpg"
import teachIn from "../assets/teachIn.jpg"
import '../styling/Home.css'

const Home = () => {
  return (
    <div className="homepage">
      <h1 className="homepageTitle">Asian American Students in Action</h1>

      <Grid container spacing={2} sx={{
        marginTop: '50px', justifyContent: 'center'
      }}>
        {[
          { image: teachIn, label: 'About', link: '/about'},
          { image: picnic, label: 'Community', link: '/community/forum' },
          { image: aasm, label: 'Action', link: '/action' }
        ].map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            flexBasis: 0,
            flexGrow: 1
          }}>
            <img src={section.image} style={{width: '100%', height: 'auto', borderRadius: '8px'}}/>
            <Button variant="contained" color="blue" href={section.link} sx={{ textTransform: 'none', width: '75%', height: '30px' }}>{section.label}</Button>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home