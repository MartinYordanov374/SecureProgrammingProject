import React from 'react'
import {NavItem, Navbar, NavLink, NavbarBrand, Nav} from 'react-bootstrap'
export default function NavigationBar() {
  const handleLogOut = () => {
    console.log('logging out')
  }
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
        <NavItem>
            <NavLink href='/Profile/:id'> My profile</NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={() => {handleLogOut()}}> Log out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}
