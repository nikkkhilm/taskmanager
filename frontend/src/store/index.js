import {createSlice,configureStore} from "@reduxjs/toolkit";

// authslice is used for authentication
const authSlice = createSlice({
    name:"auth",
    initialState:{user:"",isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        }
    }
});

export const authActions =authSlice.actions;

export const store = configureStore({
    reducer:authSlice.reducer,
})