import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading:false,
  error:false,
  blogs:[],
  userLikes:[],
  blogDetail:[],
  categories:[],
  userBlogs:[]
};

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{

        fetchStart:(state)=>{
            state.loading = true;
            state.error= false;
        },

        getBlogDetailLikeSuccess: (state,{payload})=>{
            state.loading = false;
            state[payload.url] = payload.data
        },

        fetchFail:(state)=>{
            state.loading=false;
            state.error= true;
        },

    }
});

export const { getBlogDetailLikeSuccess,fetchStart,fetchFail} = blogSlice.actions;

export default blogSlice.reducer;