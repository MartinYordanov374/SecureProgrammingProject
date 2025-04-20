import React, { useEffect, useState } from 'react'
import {Button, Container, Modal, Toast} from 'react-bootstrap'
import Post from '../Post/Post.jsx'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Profile() {
  let [userPosts, setUserPosts] = useState([])
  const [isModalShown, setIsModalShown] = useState(false)
    const [currentUserData, setCurrentUserData] = useState({})
  

  const showModal = () => {
    setIsModalShown(true)
  }
  const hideModal = () => {
    setIsModalShown(false)
  }

  const {id} = useParams()

  const getUserPosts = async() => {
    await Axios.get(`http://192.168.50.213:5001/post/fetch/owner/${id}`, {withCredentials: true})
    .then((res) => {
      setUserPosts(res.data.post)
    })
    .catch((err) => {
      // console.log(err)
      toast.error(err.response.data.message)
    })
  }

  const getUserId = async() => {
    await Axios.get('http://192.168.50.213:5001/user/get/currentUser', {withCredentials: true})
    .then((res) => {
      // console.log(res.data)
      setCurrentUserData(res.data)
    })
    .catch((err) => {
      // console.log(err)
    })
  }


  const HandleDeleteProfile = () => {
    showModal()
  }

  const DeleteProfile = async() => {
    await Axios.delete(`http://192.168.50.213:5001/user/delete/${id}`, {withCredentials: true})
    .then((res) => {      
      hideModal()
      // console.log(res.data)
      toast.success(res.data)
      setTimeout(() => {
        window.location.href='/'
      }, (2500));
    })
    .catch((err) => {
      // console.log(err.response.data.message)
    })
    
  }
  useEffect(() => {
    getUserPosts()
    getUserId()
  }, [])
  return (
    <div>
        <Container>
            <ToastContainer/>
            <h2>Profile page</h2>

            {currentUserData.userID == id
            ?
              <Button className='btn-danger' onClick={() => HandleDeleteProfile()}>  Delete my profile </Button>
            :
              ""
            }
            <div>
              <br></br>
              <h4>User posts</h4>
                {userPosts.length > 0 ?
                  userPosts.map((post) => {
                    return( <Post postObject={post}/>)
                  })
                  :
                  <p>You do not have any posts yet.</p>
                }
            </div>
            

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
