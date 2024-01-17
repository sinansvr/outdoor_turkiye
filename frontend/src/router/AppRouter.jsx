import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from "../pages/Home"
import About from '../pages/About'
import AppBar from "../components/AppBar"

const AppRouter = () => {
  return (
    <>    
    <Router>
      <AppBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default AppRouter