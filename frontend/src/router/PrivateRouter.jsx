import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom"


const PrivateRouter = () => {
    const {token} = useSelector((state)=>state.auth)
    console.log(token)
    // const currentuser = true;
    return token ? <Outlet/> : <Navigate to ="/login"/>;  
}

export default PrivateRouter