import React, { useEffect, useState } from 'react'
import Post from '../Post/Post.jsx'
import Axios from 'axios'
import useAuth from '../../Hooks/useAuth.js'
import CreatePost from '../CreatePostField/CreatePost.jsx'
export default function Home() {
  const [posts, setPosts] = useState([])
  const [postsModified, setPostsModified] = useState(false)
  const [rateLimitMessage, setRateLimitMessage] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [isRegistered, isLoading] = useAuth()

  const GetPosts = async() => {
    await Axios.get('http://localhost:5001/post/getAll',{withCredentials: true})
    .then((res) => {
      setPosts(res.data.posts.reverse())
      setPostsModified(true)
      setIsRateLimited(false)
    })
    .catch((err) => {
      setRateLimitMessage(err.response.data.message)
      setIsRateLimited(true)
    })
  }
  useEffect(() => {
    GetPosts()
    setPostsModified(false)
  }, [postsModified])
  return (
    <div>
      Home  
      {
      isRegistered 
      ?
        <CreatePost/>
      : 
        ""
      }
      {posts.length > 0 
          ?
            posts.map((post) => {
              return(<Post postObject={post}/>)
            })
          :
          (
            isRateLimited 
            ? 
              <h3 style={{'textAlign':'center'}}>{rateLimitMessage}</h3>
            :
              <h1 style={{'textAlign':'center'}}>There are no posts yet. Create one!</h1>
          )

      }
      
    </div>
  )
}
