import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from "../pages/Home"
import About from '../pages/About'
import AppBar from "../components/AppBar"
import Login from "../pages/Login"
import Register from '../pages/Register'


const AppRouter = () => {
  return (
    <>    
    <Router>
      <AppBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>


      </Routes>
    </Router>
    </>
  )
}

export default AppRouter