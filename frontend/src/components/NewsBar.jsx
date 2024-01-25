import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

const NewsBar = () => {
  const [news, setNews] = useState([])

  const getNews = async () => {
    const { data } = await axios(`${import.meta.env.VITE_NEWS_API}`)
    setNews(data.articles.slice(0,5)
    )
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <div>
      {news.map((article, index) => (
        <Card variant="outlined" key={index}>
          <CardContent>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {article.title}
            </Typography>           
            <Typography variant="body2">
              {article.description}
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={()=>{window.open(article.url,"_blank")}} size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}

    </div>
  )
}

export default NewsBar