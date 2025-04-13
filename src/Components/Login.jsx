import React, {useState} from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

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
        toast.success('Login successful')
        setTimeout(() => {
          navigate('/')
        }, 2500);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
    }
    else
    {
      toast.warn('All fields are required!')
    }
  }
  return (
      <div>
        <NavigationBar/>
        <ToastContainer/>
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
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
          <Button className='LoginBtn' onClick={() => HandleUserLogin()}>Log in</Button>
        </Container>
        
       
      </div>
  )
}
