import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess,logoutSuccess,registerSuccess } from "../features/AuthSlice"
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
  
  const logout = async () => {

    dispatch(fetchStart())

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/logout");
      dispatch(logoutSuccess());
      navigate("/")
      toastSuccessNotify('Successfuly logged out!')

    } catch (error) {

      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("You could not Logout. Something went wrong.")
    }
  } 

  const register = async (userData) => {

    dispatch(fetchStart())
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/register", userData);
      dispatch(registerSuccess(data));
      navigate("/")
      toastSuccessNotify('New user successfuly registered!')
      
    } catch (error) {

      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("Couldn't registered! Something went wrong.")
    }
  }

  return { login,logout,register }
}

export default useAuthCall;
