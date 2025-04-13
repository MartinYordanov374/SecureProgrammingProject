import React from 'react'
import {NavItem, Navbar, NavLink, NavbarBrand, Nav} from 'react-bootstrap'
import useAuth from '../Hooks/useAuth.js'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function NavigationBar() 
{
  const [isRegistered, isLoading] = useAuth();
  const navigate = useNavigate()
  const handleLogOut = () => {
    async function LogOut(){
      await Axios.post('http://localhost:5001/user/logout', {}, {withCredentials: true})
      .then((res) => {
        navigate('/') //TODO: Make that work
      })
      .catch((err) => {
        console.log(err)
      })
    }

    LogOut()
    
  }
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
              <NavLink href='/Profile/:id'> My profile</NavLink>
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
