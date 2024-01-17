import { Navigate, Outlet} from "react-router-dom"


const PrivateRouter = () => {
    const currentuser = true;
    return currentuser ? <Outlet/> : <Navigate to ="/login"/>;  
}

export default PrivateRouter