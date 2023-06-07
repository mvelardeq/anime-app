import { useDispatch, useSelector } from "react-redux"
import { NavLink, useLinkClickHandler, useLocation } from "react-router-dom"
import { favoriteIcon, homeIcon, logoutIcon, movieIcon, profileIcon, searchIcon } from "../../assets/icons"
import { startLogout } from "../../store/auth"
import { IconNav } from "../components"
import {Navbar,Avatar,Dropdown, Flowbite, DarkThemeToggle} from 'flowbite-react'

export const MoviesLayout = ({children}) => {

  const dispatch = useDispatch()
  const onLogout = ()=>{
    dispatch(startLogout())
  }
  const {displayName,photoURL,email} = useSelector(state=>state.auth)
  // console.log(user)

  return (

    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col relative">
      <Navbar
      border={true}
        fluid={true}
        rounded={false}
        style={{position:"sticky",top:"0",zIndex:'20'}}
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MoviesApp
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-3">
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          <Dropdown
            arrowIcon={true}
            inline={true}
            label={<Avatar alt="User settings" img={photoURL} rounded={true} size={'md'} stacked={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {displayName}
              </span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>
              Settings
            </Dropdown.Item>
            <Dropdown.Item>
              Earnings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link onClick={useLinkClickHandler("/")} href="/" active={useLocation().pathname==="/"}>
            Home
          </Navbar.Link>
          <Navbar.Link onClick={useLinkClickHandler("/movies")} href="/" active={useLocation().pathname==="/movies"}>
            Movies
          </Navbar.Link>
          <Navbar.Link onClick={useLinkClickHandler("/favorites")} href="/favorites" active={useLocation().pathname==="/favorites"}>
            Favorites
          </Navbar.Link>
          <Navbar.Link onClick={useLinkClickHandler("/my-profile")} href="/my-profile" active={useLocation().pathname==="/my-profile"}>
            Profile
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main className="vertical-content min-h-screen bg-white dark:bg-gray-900 w-full text-white flex-1 px-5 py-6">
            {children}
      </main>
    </div>

    

    
  )
}
