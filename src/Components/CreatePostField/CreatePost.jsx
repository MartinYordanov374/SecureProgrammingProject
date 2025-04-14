import React, { useState } from 'react'
import './CreatePostStyles.css'
import { Button, Card, FormControl, Modal } from 'react-bootstrap'
import Axios from 'axios'

export default function CreatePost() 
{
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [parentId, setParentId] = useState(-1)

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
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

  }
  return (
    <>
    <Card 
    className='CreatePostField'
    onClick={() => {handleCreatePostClick()}}
    >
      How is your cyber security journey going?
    </Card>

    <Modal show={isModalOpen} onHide={hideModal} onShow={showModal}>
        <Modal.Header>Create post</Modal.Header>
        <Modal.Body>
            <FormControl 
                as='textarea'
                rows={2}
                placeholder='How is your cyber security journey going?'
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
