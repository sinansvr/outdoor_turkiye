import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/AuthSlice"
import blogReducer from '../features/BlogSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
    },  blog:blogReducer
})

export default store;