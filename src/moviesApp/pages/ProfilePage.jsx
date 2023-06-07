import { Avatar } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { cameraIcon, userIcon } from "../../assets/icons"
import { useForm } from "../../hooks";
import { useGetProfileUserInfo } from "../../hooks/useGetProfileUserInfo";
import { MoviesLayout } from "../layout"

export const ProfilePage = () => {


  const navigate = useNavigate()

  const {userId} = useParams()
  const {uid} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(userId === uid) navigate("/my-profile")
  },[])

  const {userInfo} = useGetProfileUserInfo(userId)


  console.log(userId)

  return (
    <MoviesLayout>
      <div className="profile-page">
        <div className="header-profile">
          <img src="" alt="" />
          <Avatar alt="User settings"
          img={userInfo?.photoURL}
          rounded={true}
          size={"md"}
          stacked={false} />
        </div>
      </div>
    </MoviesLayout>
  ) 
}
