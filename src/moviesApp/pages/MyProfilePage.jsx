import { Avatar } from "flowbite-react"
import { useSelector } from "react-redux"
import { MoviesLayout } from "../layout"

export const MyProfilePage = () => {

  const {displayName,photoURL,email,uid} = useSelector(state=>state.auth)

  console.log(uid)

  return (
    <MoviesLayout>
      <div className="profile-page">
        <div className="header-profile">
          <img src="" alt="" />
          <Avatar alt="User settings"
          img={photoURL}
          rounded={true}
          size={"md"}
          stacked={false} />
        </div>
      </div>
    </MoviesLayout>
  )
}
