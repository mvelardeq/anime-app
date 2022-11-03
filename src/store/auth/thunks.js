import { doc, setDoc } from "firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
import { loginWithEmailPassword, logoutUser, signInWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { existUserByUid } from "../../helpers/existUserByUid"
import { upLoadFile } from "../../helpers/uploadFile"
import { resetMoviesState } from "../moviesApp/moviesSlice"
import { checkingCredencials, login, logout } from "./"

export const checkingAuthentication = ()=>{
    return async()=>{
        disptach(checkingCredencials())
    }
}

export const startLoginWithGoogle = ()=>{
    return async(disptach)=>{

        disptach(checkingCredencials())
        const result = await signInWithGoogle()

        if(!result.ok) return disptach(logout(result))

        // console.log(await existUserByUid(result.uid))

        if(!(await existUserByUid(result.uid))){
            const userRef = doc(FirebaseDB, `user/${result.uid}`);

            await setDoc(userRef, {
                userInfo:{
                    displayName:result.displayName,
                    photoURL:result.photoURL,
                    email:result.email
                }
            });
        }

        disptach(login(result))

    }
}

export const startSignInWithEmailPassword = ({displayName,email,password,selectedFile:file})=>{
    return async(disptach)=>{
        disptach(checkingCredencials())
        
        const photoURL = await upLoadFile(file)

        console.log(photoURL)

        const result = await signInWithEmailPassword({displayName,email,password,photoURL})

        if(!result.ok) return disptach(logout(result))

        disptach(login(result))
    }
}

export const startLoginWithEmailPassword = ({email,password})=>{
    return async(disptach)=>{
        disptach(checkingCredencials())
        const result = await loginWithEmailPassword({email,password})

        
        if(!result.ok) return disptach(logout(result))

        disptach(login(result))
    }
}

export const startLogout = ()=>{
    return async(dispatch)=>{
        dispatch(checkingCredencials())
        await logoutUser()
        dispatch(logout())
        dispatch(resetMoviesState())
    }
}

export const startUploadingFile = (file='')=>{
    return async(dispatch)=>{
        await upLoadFile(file)
    }
}