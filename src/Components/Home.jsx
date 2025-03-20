import React from 'react'
import NavigationBar from './Navbar.jsx'
import Post from './Post.jsx'

export default function Home() {
  let posts = [1,2,3,4,5]
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
