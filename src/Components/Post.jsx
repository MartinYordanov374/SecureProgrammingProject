import React from 'react'
import {Container, Card} from 'react-bootstrap'
import '../Styles/Post/PostStyles.css'
export default function Post({postObject}) {
  console.log(postObject)
  return (
      <Container className='postContainer'>
        <Card>
          <Card.Header>
            {postObject.postOwner.username}
          </Card.Header>
          <Card.Body>
            {postObject.postBody}
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
