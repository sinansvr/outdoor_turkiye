import { useEffect, useState } from "react"
import NewsCard from "./newsCard"
import axios from "axios"

const NewsBar = () => {
  const [news, setNews] = useState([])

  const getNews= async()=>{
    const {data} = await axios(`${import.meta.env.VITE_NEWS_API}`)
    console.log(data)
    setNews()
  }

  useEffect(() => {
    getNews()   
  }, [])

  return (
    <div>
      <NewsCard/>
    </div>
  )
}

export default NewsBar