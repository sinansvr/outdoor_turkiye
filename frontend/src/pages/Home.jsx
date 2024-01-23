import { Grid } from "@mui/material"
import NewsBar from "../components/NewsBar"

const Home = () => {
  return (
    <Grid container >
      <Grid item xs={8} sx={{backgroundColor:"#bebe", minHeight:"100vh"}}>
        Home
      </Grid>
      
      <Grid item xs={4} sx={{backgroundColor:"#dede", minHeight:"100vh"}}>
        <NewsBar/>
      </Grid>
    </Grid>
  )
}

export default Home