import {signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { FirebaseAuth } from './config'

export const signInWithGoogle = async()=>{

    try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(FirebaseAuth,provider)
        const {uid,email,displayName,photoURL} = result.user

        return {
            ok:true,
            uid,email,displayName,photoURL
        }
    } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message;

        return{
            ok:false,
            errorMessage,
        }
    }

}


export const signInWithEmailPassword = async({displayName,email,password,photoURL})=>{

    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
        await updateProfile(FirebaseAuth.currentUser,{displayName,photoURL})
        const {uid} =result.user

        return {
            ok:true,
            uid,email,displayName,photoURL
        }
    } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message;
        
        return{
            ok:false,
            errorMessage,
        }
    }

}

export const loginWithEmailPassword = async({email, password})=>{
    try {
        
        const result = await signInWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,displayName,photoURL} = result.user
        return {
            ok:true,
            uid,email,displayName,photoURL
        }

    } catch (error) {
        const errorMessage = error.message
        console.log(error)
        return {
            ok:false,
            errorMessage
        }
    }
}

export const logoutUser = async()=>{
    try {
        const result = await signOut(FirebaseAuth)
    } catch (error) {
        console.log(error)
    }
}