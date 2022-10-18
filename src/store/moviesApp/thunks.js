import { addPost, getAttachMovies, getMovies, loadFavorites, newFavorite, removeFavoriteMovie, savingNewInfo } from "./moviesSlice"
import {arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import { FirebaseDB } from "../../firebase/config"
import { getMovieById } from "../../helpers/getMovieById"
import { upLoadFile } from "../../helpers/uploadFile"
import { movieResponseByData } from "../../helpers/movieResponseByData"


export const getMoviesByURL = (url)=>{
    return async(dispatch)=>{
        const result = await fetch(url)
        const {data} = await result.json()
        const resultMovies =[]
        data.forEach(item=>{
            resultMovies.push(movieResponseByData(item))
        })
        dispatch(getMovies(resultMovies))
    }
}
export const getAttachMoviesByURL = (url)=>{
    return async(dispatch)=>{
        const result = await fetch(url)
        const {data} = await result.json()
        const resultMovies =[]
        data.forEach(item=>{
            resultMovies.push(movieResponseByData(item))
        })
        dispatch(getAttachMovies(resultMovies))
    }
}


export const startNewFavorite = (mal_id)=>{
    return async(dispatch, getState)=>{
        // dispatch(savingNewInfo())
        const favorite = await getMovieById(mal_id)
        dispatch(newFavorite(favorite))
        
        const {uid} = getState().auth
        const userRef = doc(FirebaseDB,`user/${uid}`)

        await setDoc(userRef,{
            favorites:arrayUnion(mal_id)
        },{merge:true})


    }
}

export const startDeleteFavorite = (mal_id)=>{
    return async(dispatch,getState)=>{
        dispatch(removeFavoriteMovie(mal_id))
        const {uid} = getState().auth
        const userRef = doc(FirebaseDB,`user/${uid}`)
        await updateDoc(userRef,{
            favorites:arrayRemove(mal_id)
        })
    }
}

export const startGetFavorites = ()=>{
    return async(dispatch,getState)=>{
        
        // dispatch(savingNewInfo())
        const {uid} = getState().auth
        const userRef = doc(FirebaseDB,`user/${uid}`)
        const userData = await getDoc(userRef)
        
        const favorites = userData.data()?.favorites
        const favoriteMovies = []

        if(!favorites) return null

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const myfunc = async()=>{
            for (const favorite of favorites) {
                await timeout(180)
                const result = await getMovieById(favorite)
                favoriteMovies.push(result)
            }
        }
        await myfunc()
        dispatch(loadFavorites(favoriteMovies))
    }
}

export const startNewPost = ({description,photoFile,relatedMovie})=>{
    return async(dispatch, getState)=>{

        const photoURL = await upLoadFile(photoFile)

        dispatch(addPost({description,photoURL,relatedMovie}))
        
        const {uid} = getState().auth
        const postCollectionRef = collection(FirebaseDB,`user/${uid}/post`)

        await setDoc(postCollectionRef,{
            description,
            photoURL,
            relatedMovie
        })

    }
}