import React, { useEffect } from 'react'
import NavigationBar from './Navbar.jsx'
import Post from './Post.jsx'
import Axios from 'axios'

export default function Home() {
  let posts = [1,2,3,4,5]
  const GetPosts = async() => {
    await Axios.get('http://localhost:5001/post/getAll',{})
    .then((res) => {
      console.log(res)
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
      {posts.map(() => {
       return(<Post></Post>)
      })}
      
    </div>
  )
}
