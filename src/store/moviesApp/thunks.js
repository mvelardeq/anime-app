import { addPost, dislikePost, getAttachMovies, getMovies, getPosts, likePost, loadFavorites, newCommentPost, newFavorite, removeFavoriteMovie, savingNewInfo } from "./moviesSlice"
import {addDoc, arrayRemove, arrayUnion, collection, doc, Firestore, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from 'firebase/firestore'
import { FirebaseDB } from "../../firebase/config"
import { getMovieById } from "../../helpers/getMovieById"
import { upLoadFile } from "../../helpers/uploadFile"
import { movieResponseByData } from "../../helpers/movieResponseByData"
import { async } from "@firebase/util"


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
                await timeout(340)
                const result = await getMovieById(favorite)
                favoriteMovies.push(result)
            }
        }
        await myfunc()
        dispatch(loadFavorites(favoriteMovies))
    }
}


export const startGetPosts = () => {
    return async(dispatch,getState)=>{
        const q= query(collection(FirebaseDB,"post"),orderBy("date","asc"))
        const postSnapshot = await getDocs(q)
        postSnapshot.forEach(async(post)=>{
            const {userId} = post.data()
            const userSnapshot = await getDoc(doc(FirebaseDB,`user/${userId}`))
            const {userInfo} = userSnapshot.data()
            const comments= []
            const commentsSnapshot = await getDocs(query(collection(FirebaseDB,`post/${post.id}/comments`),orderBy("date","asc")))
            commentsSnapshot.forEach(async(comment)=>{
                comments.unshift({...comment.data(),id:comment.id,isReplyingActive:false})
                console.log(comment.data())
            })
            dispatch(addPost({...post.data(), userInfo,id:post.id,comments}))
        })
    }
}


export const startCreateNewPost = ({description,selectedFile,attatchMovieId:relatedMovieId,date,attachedPhoto:photoRelatedMovie})=>{
    return async(dispatch, getState)=>{

        const photoPost = await upLoadFile(selectedFile)

        
        const {uid} = getState().auth
        const userSnapshot = await getDoc(doc(FirebaseDB,`user/${uid}`))
        const {userInfo} = userSnapshot.data()
        const postCollectionRef = collection(FirebaseDB,`post`)


        const result =await addDoc(postCollectionRef,{
            description,
            photoPost,
            relatedMovieId,
            date,
            likes:[],
            photoRelatedMovie,
            userId:uid
        })
        dispatch(addPost({description,photoPost,relatedMovieId,date,likes:[],photoRelatedMovie,id:result.id,userId:uid,userInfo}))

    }
}

export const startLikePost = ({id,userId,date})=>{
    return async(dispatch,getState)=>{

        dispatch(likePost({id,userId,date}))

        const postRef = doc(FirebaseDB,`post/${id}`)
        await setDoc(postRef,{
            likes:arrayUnion({date,userId})
        },{merge:true})
    }
}

export const startDislikePost = ({id,userId})=>{
    return async(dispatch,getState)=>{

        dispatch(dislikePost({id,userId}))

        const postSnapshot = await getDoc(doc(FirebaseDB,`post/${id}`))
        const {likes}=postSnapshot.data()
        const like = likes.find(el=>el.userId===userId)

        const postRef = doc(FirebaseDB,`post/${id}`)
        await updateDoc(postRef,{
            likes:arrayRemove(like)
        })
    }
}

export const startCreateNewComment = ({postId,description,date,userId})=>{

    return async(dispatch,getState)=>{

        const commentPostRef = collection(FirebaseDB,`post/${postId}/comments`)

        const userSnapshot = await getDoc(doc(FirebaseDB,`user/${userId}`))
        const {userInfo} = userSnapshot.data()

        const result = await addDoc(commentPostRef,{
            description,
            date,
            likes:[],
            replies:[],
            userInfo
        })

        dispatch(newCommentPost({postId,userInfo,date,description,likes:[],replies:[],id:result.id,isReplyingActive:false}))

    }
}