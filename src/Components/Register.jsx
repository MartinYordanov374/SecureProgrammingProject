import React from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
export default function Register() {
  return (
    <div>
       <NavigationBar/>
       <Container className='LoginContainer'>
        <p>Sign up</p>
        <Form>
          <FormControl 
          className='FormField'
          placeholder='Enter username'
          />
          <FormControl 
          className='FormField'
          placeholder='Enter password'
          />
           <FormControl 
          className='FormField'
          placeholder='Confirm password'
          />
        </Form>
        <Button className='LoginBtn'>Sign up</Button>
      </Container>
    </div>
  )
}
