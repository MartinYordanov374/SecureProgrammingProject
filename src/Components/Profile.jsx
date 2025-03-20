import React from 'react'
import NavigationBar from './Navbar.jsx'
import {Form, FormControl, Button, Container} from 'react-bootstrap'
import Post from './Post.jsx'

export default function Profile() {
  let userPosts = [{}, {}, {}]
  return (
    <div>
        <NavigationBar/>
        <Container>
            
            <p>My profile</p>
            <Button className='btn-danger'>  Delete my profile </Button>
            {userPosts.map(() => {
                return( <Post></Post>)
            })}
        </Container>
    </div>
  )
}
