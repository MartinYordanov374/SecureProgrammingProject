import React, { useEffect, useState } from 'react'
import {Button, Container} from 'react-bootstrap'
import Post from '../Post/Post.jsx'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Profile() {
  let [userPosts, setUserPosts] = useState([])
  const {id} = useParams()

  const getUserPosts = async() => {
    await Axios.get(`http://localhost:5001/post/fetch/owner/${id}`, {withCredentials: true})
    .then((res) => {
      setUserPosts(res.data.post)
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  useEffect(() => {
    getUserPosts()
  }, [])
  return (
    <div>
        <Container>
            
            <p>My profile</p>
            <Button className='btn-danger'>  Delete my profile </Button>
            {userPosts.map((post) => {
                return( <Post postObject={post}/>)
            })}
        </Container>
    </div>
  )
}
