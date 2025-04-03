import React, {useState} from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import '../Styles/Login/LoginStyles.css'
import Axios from 'axios'
export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const HandleUserLogin = async () => {
    if(username.trim() && password.trim())
    {
      await Axios.post('http://localhost:5001/user/login', 
      {
        username,
        password
      })
      .then((res) => {
        alert(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else
    {
      //TODO: Add toast container alert
    }
  }

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
