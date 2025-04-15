import React, { useEffect, useState } from 'react'
import Post from '../Post/Post.jsx'
import Axios from 'axios'
import useAuth from '../../Hooks/useAuth.js'
import CreatePost from '../CreatePostField/CreatePost.jsx'
export default function Home() {
  const [posts, setPosts] = useState([])
  
  const [isRegistered, isLoading] = useAuth()

  const GetPosts = async() => {
    await Axios.get('http://localhost:5001/post/getAll',{withCredentials: true})
    .then((res) => {
      setPosts(res.data.posts.reverse())
    })
    .catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    GetPosts()
  }, [posts])
  return (
    <div>
      Home  
      {isRegistered ?
     <CreatePost/>
     : ""}
      {posts.length > 0 
        ?
          posts.map((post) => {
            return(<Post postObject={post}/>)
          })
        :
          <h1 style={{'textAlign':'center'}}>There are no posts yet. Create one!</h1>

      }
      
    </div>
  )
}
