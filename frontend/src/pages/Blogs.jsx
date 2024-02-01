import { Grid } from "@mui/material"
import BlogsCard from "../components/BlogsCard"
import { useEffect } from "react"
import useBlogCall from "../hooks/useBlogCall"

const Blogs = () => {

  const { getBlogs } = useBlogCall()
  
  useEffect(() => {
    getBlogs("blogs")

  }, [])


  return (
    <Grid container>
      <Grid item><BlogsCard /></Grid>
    </Grid>
  )
}

export default Blogs