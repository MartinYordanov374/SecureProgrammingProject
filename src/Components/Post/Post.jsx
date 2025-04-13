import React from 'react'
import {Container, Card} from 'react-bootstrap'
import './PostStyles.css'
export default function Post({postObject, isComment=false}) 
{
  console.log(postObject)
  const HandleCommentSectionVisibility = (id) => {
    let commentSection = document.getElementById(`${id}`)
    if(commentSection)
    {
      if(commentSection.style.display == 'block')
        {
          commentSection.style.display = "none"
        }
        else
        {
          commentSection.style.display = "block"
        }
    }
  }
  return (
      <Container className='postContainer' style={{width:'50%'}} key={postObject._id}>
        <Card>
            {postObject.postOwner?.username}
          <Card.Body>
            {postObject.postBody}
          </Card.Body>
          <div className='PostInteractionButtons row' style={{textAlign: 'center'}}>
            {isComment ?
              <> 
                <div className='col interactionButton'>Like</div>
              </>
              :
              <>
                <div className='col interactionButton'>Like</div>
                <div className='col interactionButton' onClick={() => {HandleCommentSectionVisibility(postObject._id)}}>
                {postObject.comments?.length == 0 ? 0 : postObject.comments?.length}  Comments
                </div>
                <div className='col interactionButton'>Share</div>
              </>
             
            }

          </div>
        </Card>
       
          {postObject.comments?.length > 0 ? 
              <Card className='commentSection' id={postObject._id}>
                {postObject.comments.map((comment) => {
                  return(<Post postObject={comment} isComment={true}/>)
                })}
              </Card>
              : ""}
       
      </Container>
  )
}
