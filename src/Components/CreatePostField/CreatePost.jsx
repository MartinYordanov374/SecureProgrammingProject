import React, { useState } from 'react'
import './CreatePostStyles.css'
import { Button, Card, FormControl, Modal } from 'react-bootstrap'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
export default function CreatePost({parentId=-1, className='CreatePostField', placeholder='How is your cyber security journey going?'}) 
{
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postContent, setPostContent] = useState('')

  const hideModal = () => {
    setIsModalOpen(false)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCreatePostClick = () => {
    if(isModalOpen)
    {
        hideModal()
    }
    else
    {
        showModal()
    }
  }
  const createPost = async() => {
    await Axios.post(
        'http://localhost:5001/post/create', 
        {'content': postContent, 'parentId': parentId}, 
        {withCredentials: true}
    )
    .then((res) => {
        toast.success(res.data.message)
    })
    .catch((err) => {
        toast.error(err.response.data.message)
    })

  }
  return (
    <>
    <ToastContainer/>
    <Card 
    className={className} //'CreatePostField', 'CreateCommentField'
    onClick={() => {handleCreatePostClick()}}
    >
      {placeholder}
    </Card>

    <Modal show={isModalOpen} onHide={hideModal} onShow={showModal}>
        <Modal.Header>Share your thoughts!</Modal.Header>
        <Modal.Body>
            <FormControl 
                as='textarea'
                rows={2}
                placeholder={placeholder}
                className='CreatePostModalInputField'
                onChange={(e) => setPostContent(e.target.value)}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button className='btn-danger' onClick={() => hideModal()}>Cancel</Button>
            <Button onClick={() => createPost()}>Publish</Button>
        </Modal.Footer>
    </Modal>
    </>
    
  )
}
