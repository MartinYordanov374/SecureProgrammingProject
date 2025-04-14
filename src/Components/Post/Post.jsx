import React, { useEffect, useState } from 'react'
import {Container, Card} from 'react-bootstrap'
import './PostStyles.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NavigationBar from '../Navbar/Navbar.jsx'
import Axios from 'axios'
import CreatePost from '../CreatePostField/CreatePost.jsx'

export default function Post({postObject=undefined, isComment=false}) 
{
  const navigate = useNavigate()
  const [isReadMoreSelected, setIsReadMoreSelected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [localPostObject, setLocalPostObject] = useState(postObject);
  const [isSpecificPostPage, setIsSpecificPostPage] = useState(false)
  const {id} = useParams()

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

  const HandleReadMore = (e) => {
    e.stopPropagation()
    if(isReadMoreSelected)
    {
      setIsReadMoreSelected(false)
    }
    else
    {
      setIsReadMoreSelected(true)
    }
  }

  const NavigateToPostPage = () => {
    navigate(`/post/${localPostObject._id}`)
  }

  const GetTargetPost = async() => {
    await Axios.get(`http://localhost:5001/post/fetch/${id}`)
    .then((res) => {
      setLocalPostObject(res.data.post[0])
      setIsSpecificPostPage(true)
      setLoading(false)
    })
    .catch((err) => {
       console.log(err)
    })
  }

  const HandleLikePost = async() => {
    await Axios.post(`http://localhost:5001/post/like/${localPostObject._id}`, {}, {withCredentials: true})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(postObject==undefined)
    {
      GetTargetPost()
    }
    else
    {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading 
      ?
       "Loading..." 
      :
        <Container className='postContainer' style={{width:'50%'}} key={localPostObject?._id}>
          <Card>
              <a 
              className='postOwnerLink'
              href={`/Profile/${localPostObject?.postOwner?._id}`}
              >
                {localPostObject?.postOwner?.username}
              </a>
              <hr/>
            <Card.Body className='PostBody' onClick={!isSpecificPostPage && !isComment? ()=>NavigateToPostPage() : ()=>{}}>
              {
              localPostObject?.postBody?.length > 150 
              ?
                (!isReadMoreSelected
                  ? 
                    <>
                      {localPostObject.postBody.slice(0,150)} 
                      <a className='readMoreButton' onClick={(e) => HandleReadMore(e)}>
                        ...read more
                      </a> 
                    </>
                  : 
                  <>
                  {localPostObject.postBody} 
                  <a className='readMoreButton' onClick={(e) => HandleReadMore(e)}>
                    ...show less
                  </a> 
                  </>
                )
              :
              localPostObject?.postBody
              }
            </Card.Body>
            <hr/>
            <div className='PostInteractionButtons row' style={{textAlign: 'center'}}>
              {isComment ?
                <> 
                  <div className='col interactionButton' onClick={() => HandleLikePost()}>{localPostObject?.likes.length} Like</div>
                </>
                :
                <>
                  <div className='col interactionButton' onClick={() => HandleLikePost()}>{localPostObject?.likes.length} Like</div>
                  <div className='col interactionButton' onClick={() => {HandleCommentSectionVisibility(localPostObject?._id)}}>
                  {localPostObject?.comments?.length == 0 ? 0 : localPostObject?.comments?.length}  Comments
                  </div>
                </>
              
              }

            </div>
          </Card>
            {localPostObject?.comments?.length >= 0 ? 
                <Card className='commentSection' id={localPostObject?._id}>
                  <CreatePost className='CreateCommentField' placeholder='Write a comment' parentId={localPostObject?._id}/>
                  {localPostObject?.comments.map((comment) => {
                    return(<Post postObject={comment} isComment={true}/>)
                  })}
                </Card>
                : ""}
        
        </Container>
      }
    </>
  )
}
