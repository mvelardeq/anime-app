import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FirebaseDB } from "../firebase/config"

export const useGetProfileUserInfo = (userId) => {

    const currentUserInfo = useSelector(state=>state.auth)

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState(null)

    const getUserById = async (id)=>{

      try {
        
        console.log('uhuh')
        const userSnapshot = await getDoc(doc(FirebaseDB,`user/${id}`))
        const {userInfo} = userSnapshot.data()
        return setUserInfo(userInfo)

      } catch (error) {
        
        

      }

    }

    useEffect(()=>{
      if(getUserById(userId)){
        getUserById(userId)
      }else{
        return navigate("/profile")
      }
    },[])

  return {
    userInfo
  }
}
