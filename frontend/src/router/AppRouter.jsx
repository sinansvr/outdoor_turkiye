import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import About from '../pages/About'
import AppBar from "../components/AppBar"
import Login from "../pages/Login"
import Register from '../pages/Register'
import Blogs from '../pages/Blogs'
import PrivateRouter from './PrivateRouter'
import Profile from '../pages/Profile'
import BlogDetail from '../pages/BlogDetail'
import NewBlog from '../pages/NewBlog'


const AppRouter = () => {
  return (
    <>
      <AppBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/' element={<PrivateRouter />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/blogdetail/:id' element={<BlogDetail />} />
            <Route path='/newblog' element={<NewBlog />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter