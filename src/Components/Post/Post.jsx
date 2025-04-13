import React, { useState } from 'react'
import {Container, Card} from 'react-bootstrap'
import './PostStyles.css'
export default function Post({postObject, isComment=false}) 
{
  const [isReadMoreSelected, setIsReadMoreSelected] = useState(false)
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

  const HandleReadMore = () => {
    if(isReadMoreSelected)
    {
      setIsReadMoreSelected(false)
    }
    else
    {
      setIsReadMoreSelected(true)
    }
  }
  return (
      <Container className='postContainer' style={{width:'50%'}} key={postObject._id}>
        <Card>
            <a 
            className='postOwnerLink'
            href={`/Profile/${postObject.postOwner._id}`}
            >
              {postObject.postOwner?.username}
            </a>
            <hr/>
          <Card.Body className='PostBody'>
            {
            postObject.postBody.length > 150 
            ?
              (!isReadMoreSelected
                ? 
                  <>
                    {postObject.postBody.slice(0,150)} 
                    <a className='readMoreButton' onClick={() => HandleReadMore()}>
                      ...read more
                    </a> 
                  </>
                : 
                <>
                {postObject.postBody} 
                <a className='readMoreButton' onClick={() => HandleReadMore()}>
                  ...show less
                </a> 
                </>
              )
            :
              postObject.postBody
            }
          </Card.Body>
          <hr/>
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
