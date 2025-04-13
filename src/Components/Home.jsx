import React, { useEffect, useState } from 'react'
import NavigationBar from './Navbar.jsx'
import Post from './Post.jsx'
import Axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])
  
  const GetPosts = async() => {
    await Axios.get('http://localhost:5001/post/getAll',{})
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
      <NavigationBar/>
      Home  
      {posts.map((post) => {
       return(<Post postObject={post}/>)
      })}
      
    </div>
  )
}
