import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart } from "../features/BlogSlice"


const useBlogCall = () => {
  const {axiosWithToken,axiosPublic} = useAxios()
  const dispatch = useDispatch()

const getBlogs = async () => {
    dispatch(fetchStart())
    try {
        await axiosPublic('/blogs')
        dispatch()
    } catch (error) {
        console.log(error)
        dispatch(fetchFail())
    }


}
  
    return (getBlogs )
}

export default useBlogCall