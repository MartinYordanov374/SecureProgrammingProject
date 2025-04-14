import React, { useState } from 'react'
import './CreatePostStyles.css'
import { Button, Card, FormCheck, FormControl, Modal } from 'react-bootstrap'

export default function CreatePost() 
{
  const [isModalOpen, setIsModalOpen] = useState(false)
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
            />
        </Modal.Body>
        <Modal.Footer>
            <Button className='btn-danger' onClick={() => hideModal()}>Cancel</Button>
            <Button>Publish</Button>
        </Modal.Footer>
    </Modal>
    </>
    
  )
}
