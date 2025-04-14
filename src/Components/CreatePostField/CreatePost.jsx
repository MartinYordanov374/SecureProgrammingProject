import React from 'react'
import './CreatePostStyles.css'
import { Card } from 'react-bootstrap'

export default function CreatePost() {
  return (
    <Card 
    placeholder='Create a post'
    className='CreatePostField'
    >
      How is your cyber security journey going?
    </Card>
  )
}
