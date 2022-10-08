import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:'checking', //checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
    initialState,
    name:'auth',
    reducers:{
        checkingCredencials: (state)=>{
            state.status='checking'
        },
        login: (state,{payload})=>{

            state.status='authenticated'
            state.uid=payload.uid
            state.email=payload.email
            state.displayName=payload.displayName
            state.photoURL=payload.photoURL

        },
        logout: (state,{payload})=>{

            state.status='not-authenticated'
            state.uid=null
            state.email=null
            state.displayName=null
            state.photoURL=null
            state.errorMessage=payload?.errorMessage

        }
    }
})

export const {checkingCredencials,login,logout} = authSlice.actions