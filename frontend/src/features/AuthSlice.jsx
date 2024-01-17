import { createSlice } from '@reduxjs/toolkit'

const authSlice= createSlice({
    name:"auth",

    initialState:{
        user:null,
        loading:false,
        error:false,
        isAdmin:false,
        token:null
    },

    reducers:{
        fetchStart :(state)=>{
            state.loading=true
            state.error=false
        },
        loginSuccess:(state,{payload})=>{
            state.loading=false;
            state.user
            
        }
    }


})

export const {}=authSlice.actions;

export default authSlice.reducer;