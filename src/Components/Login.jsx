import React from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
export default function Login() {
  return (
    <div>
      <NavigationBar/>
      <Container className='LoginContainer'>
        <p>Log in</p>
        <Form>
          <FormControl 
          className='FormField'
          placeholder='Enter username'
          />
          <FormControl 
          className='FormField'
          placeholder='Enter password'
          />
        </Form>
        <Button className='LoginBtn'>Log in</Button>
      </Container>
      
     
    </div>
  )
}
