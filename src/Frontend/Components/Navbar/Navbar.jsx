import React, { useEffect, useState } from 'react'
import {NavItem, Navbar, NavLink, NavbarBrand, Nav} from 'react-bootstrap'
import useAuth from '../../Hooks/useAuth.js'
import Axios from 'axios'

export default function NavigationBar() 
{
  const [isRegistered, isLoading] = useAuth();
  const [userID, setUserID] = useState(-1)
  const handleLogOut = () => {
    async function LogOut(){
      await Axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/user/logout`, {}, {withCredentials: true})
      .then((res) => {
        window.location.href='/'
      })
      .catch((err) => {
        // console.log(err)
      })
    }

    LogOut()
    
  }
  const GetUserID = async() => {
    await Axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/user/get/currentUser`, {withCredentials: true})
    .then((res) => {
      setUserID(res.data.userID)
    })
    .catch((err) => {
      // console.log(err)
    })
  }
  useEffect(()=>{
    GetUserID()
  }, [])
  if(isRegistered)
  {
    return (
      <Navbar>
        <NavbarBrand href='/'> SEPRO </NavbarBrand>
        <Nav>
          <NavItem>
              <NavLink href='/'> Home </NavLink>
          </NavItem>
          <NavItem>
              <NavLink href={`/Profile/${userID}`}> My profile</NavLink>
          </NavItem>
          <NavItem>
              <NavLink onClick={() => handleLogOut()}> Log out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
  else
  {
    return (
      <Navbar>
        <NavbarBrand href='/'> SEPRO </NavbarBrand>
        <Nav>
          <NavItem>
              <NavLink href='/'> Home </NavLink>
          </NavItem>
          <NavItem>
              <NavLink href='/login'> Log in </NavLink>
          </NavItem>
          <NavItem>
              <NavLink href='/register'> Sign up </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
