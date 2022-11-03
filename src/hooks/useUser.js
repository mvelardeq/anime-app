import { collection, doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FirebaseApp, FirebaseDB, FirebaseAuth } from "../firebase/config"

export const useUser = (userId) => {

    const [userAllInfo, setUserAllInfo] = useState()

    const getUserInfo = async()=>{
      const userSnapshot = await getDoc(doc(FirebaseDB,`user/${userId}`))
      // const user = await FirebaseAuth
      const {userInfo} = userSnapshot.data()
      // console.log(userInfo)
      setUserAllInfo(userInfo)
    } 

    useEffect(()=>{
      getUserInfo()
    },[])


  return {
    userAllInfo
  }
}
