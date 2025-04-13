import React from 'react'
import {Container, Card} from 'react-bootstrap'
import './PostStyles.css'
export default function Post({postObject, isComment=false}) {
  return (
      <Container className='postContainer' style={{width:'50%'}}>
        <Card>
            {postObject.postOwner.username}
          <Card.Body>
            {postObject.postBody}
          </Card.Body>
          <div className='PostInteractionButtons row' style={{textAlign: 'center'}}>
            {isComment ?
              <> 
                <div className='col'>Like</div>
              </>
              :
              <>
                <div className='col'>Like</div>
                <div className='col'>Comments</div>
                <div className='col'>Share</div>
              </>
             
            }

          </div>
        </Card>
        <Card>
          {postObject.comments.length > 0 ? 
          postObject.comments.map((comment) => {
            return(<Post postObject={comment} isComment={true}/>)
          }) : ""}
        </Card>
      </Container>
  )
}
