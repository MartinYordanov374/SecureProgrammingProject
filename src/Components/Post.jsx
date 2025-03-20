import React from 'react'
import {Container, Card} from 'react-bootstrap'
import '../Styles/Post/PostStyles.css'
export default function Post() {
  return (
      <Container className='postContainer'>
        <Card>
          <Card.Header>
            Post Owner
          </Card.Header>
          <Card.Body>
            Post body
          </Card.Body>
          <Card.Footer>
            <div>Like</div>
            <div>Comments</div>
            <div>Share</div>
          </Card.Footer>
        </Card>
      </Container>
  )
}
