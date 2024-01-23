import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess } from "../features/AuthSlice"
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (userData) => {

    dispatch(fetchStart())
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/login", userData);
      dispatch(loginSuccess(data));
      navigate(-1)
      toastSuccessNotify('Successfuly logged in!')
      
    } catch (error) {

      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("User credentials are not correct!")
    }
  }
  
  const logout = async (userData) => {

    dispatch(fetchStart())

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/login", userData);
      dispatch(loginSuccess(data));
      navigate(-1)
      toastSuccessNotify('Successfuly logged in!')

    } catch (error) {

      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("User credentials are not correct!")
    }
  } 

  return { login,logout }
}

export default useAuthCall;
