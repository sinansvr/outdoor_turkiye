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
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
          },
          loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload?.user?.username;
            state.isAdmin = action.payload?.user?.isAdmin;
            state.token = action.payload?.token;
          },
          logoutSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.token = null;
          },
          registerSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload?.username;
            state.token = payload?.token;
            state.error = false;
          },
          fetchFail: (state) => {
            state.loading = false;
            state.error = true;
          },
    }


})

export const {fetchStart,loginSuccess,logoutSuccess,registerSuccess,fetchFail,}=authSlice.actions;

export default authSlice.reducer;