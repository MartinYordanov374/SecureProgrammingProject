import React, { useEffect, useState } from 'react'
import NavigationBar from '../Navbar/Navbar.jsx'
import Post from '../Post/Post.jsx'
import Axios from 'axios'
import useAuth from '../../Hooks/useAuth.js'
import './HomeStyles.css'
import { Card } from 'react-bootstrap'
export default function Home() {
  const [posts, setPosts] = useState([])
  
  const [isRegistered, isLoading] = useAuth()

  const GetPosts = async() => {
    await Axios.get('http://localhost:5001/post/getAll',{withCredentials: true})
    .then((res) => {
      setPosts(res.data.posts)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    GetPosts()
  }, [])
  return (
    <div>
      Home  
      <Card 
      placeholder='Create a post'
      className='CreatePostField'
      >
        How is your cyber security journey going?
      </Card>
      {posts.length > 0 ?
        posts.map((post) => {
        return(<Post postObject={post}/>)
        })
        :
        <h1 style={{'textAlign':'center'}}>There are no posts yet. Create one!</h1>

      }
      
    </div>
  )
}
