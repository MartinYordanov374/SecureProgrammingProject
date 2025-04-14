import React, { useEffect, useState } from 'react'
import {Button, Container, Modal} from 'react-bootstrap'
import Post from '../Post/Post.jsx'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Profile() {
  let [userPosts, setUserPosts] = useState([])
  const [isModalShown, setIsModalShown] = useState(false)

  const showModal = () => {
    setIsModalShown(true)
  }
  const hideModal = () => {
    setIsModalShown(false)
  }

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

  const HandleDeleteProfile = () => {
    showModal()
  }

  const DeleteProfile = async() => {
    await Axios.delete(`http://localhost:5001/user/delete/${id}`, {withCredentials: true})
    .then((res) => {
      console.log(res)
      setTimeout(() => {
        window.location.href='/'
      }, (2500));
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
    
  }
  useEffect(() => {
    getUserPosts()
  }, [])
  return (
    <div>
        <Container>
            
            <p>My profile</p>
            <Button className='btn-danger' onClick={() => HandleDeleteProfile()}>  Delete my profile </Button>
            {userPosts.map((post) => {
                return( <Post postObject={post}/>)
            })}

            <Modal onShow={showModal} onHide={hideModal} show={isModalShown}>
              <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
              <Modal.Footer>
                <Button onClick={() => hideModal()}>Cancel</Button>
                <Button className='btn-danger' onClick={()=>DeleteProfile()}>Delete profile</Button>
              </Modal.Footer>
            </Modal>
        </Container>
    </div>
  )
}
