import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getBlogDetailLikeSuccess } from "../features/BlogSlice"


const useBlogCall = () => {
    const { axiosWithToken, axiosPublic } = useAxios()
    const dispatch = useDispatch()

    const getBlogs = async (url) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic('/blogs')
            dispatch(getBlogDetailLikeSuccess({ url, data }))
        } catch (error) {
            console.log(error)
            dispatch(fetchFail())
        }


    }

    return (getBlogs)
}

export default useBlogCall