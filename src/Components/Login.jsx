import React, {useState} from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
import Axios from 'axios'
import useAuth from '../Hooks/useAuth.js'
import { Navigate } from 'react-router-dom'

export default function Login() {

  const [isRegistered, isLoading] = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const HandleUserLogin = async () => {
    
    if(username.trim() && password.trim())
    {
      await Axios.post('http://localhost:5001/user/login', 
      {
        username,
        password
      }, 
    {withCredentials: true})
      .then((res) => {
        // console.log(document.cookie)
      })
      .catch((err) => {
        // console.log(err)
      })
    }
    else
    {
      //TODO: Add toast container alert
    }
  }
  if(isRegistered)
  {
      return <Navigate to='/'/>
  }
  else
  {
    return (
      <div>
        <NavigationBar/>
        <Container className='LoginContainer'>
          <p>Log in</p>
          <Form>
            <FormControl 
            className='FormField'
            placeholder='Enter username'
            onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl 
            className='FormField'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
          <Button className='LoginBtn' onClick={() => HandleUserLogin()}>Log in</Button>
        </Container>
        
       
      </div>
    )
  }

}
