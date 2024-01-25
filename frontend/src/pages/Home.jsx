import { Grid } from "@mui/material"
import NewsBar from "../components/NewsBar"
import BlogsCard from "../components/BlogsCard"

const Home = () => {
  return (
    <Grid container >
      <Grid container item  justifyContent="center" alignItems="center" xs={8} columnSpacing={2} rowSpacing={1} sx={{backgroundColor:"#bebe", minHeight:"100vh"}}>

        <Grid item><BlogsCard/></Grid>
        <Grid item><BlogsCard/></Grid>
        <Grid item><BlogsCard/></Grid>
        <Grid item><BlogsCard/></Grid>
        
        
      </Grid>
      
      <Grid item xs={4} sx={{backgroundColor:"#dede", minHeight:"100vh"}}>
        <NewsBar/>
      </Grid>
    </Grid>
  )
}

export default Home