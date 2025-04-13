import React, { useState } from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const HandleUserRegistration = async () => {
    const trimmedUsername = username.trim()
    const trimmedPass = password.trim()
    const trimmedConfirmationPass = confirmPassword.trim()
    if(trimmedUsername && trimmedPass && trimmedConfirmationPass)
    {
      if(trimmedConfirmationPass == trimmedPass)
      {
        await Axios.post('http://localhost:5001/user/register', 
          {
            username,
            password
          },
          {withCredentials: true})
          .then((res) => {
           toast.success('Registration successful')
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })
      }
      else
      {
        toast.error('The passwords do not match!')
      }

    }
    else
    {
      //TODO: Add toast container alert
      toast.warn('All input fields are required!')
    }
  }
    return (
      <div>
         <NavigationBar/>
         <ToastContainer/>
         <Container className='LoginContainer'>
          <p>Sign up</p>
          <Form>
            <FormControl 
            className='FormField'
            placeholder='Enter username'
            onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl 
            className='FormField'
            placeholder='Enter password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            />
             <FormControl 
            className='FormField'
            placeholder='Confirm password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form>
          <Button className='LoginBtn'
          onClick={() => HandleUserRegistration()}>
            Sign up
          </Button>
        </Container>
      </div>
    )
}
