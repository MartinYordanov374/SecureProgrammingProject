import React from 'react'
import useAuth from '../../Hooks/useAuth.js'
import { Navigate } from 'react-router-dom'

export default function withAuth(Component) 
{

  function WrapperComponent(){
    let [isRegistered, isLoading] = useAuth()
    if(!isLoading)
    {
      if(isRegistered)
      {
        return <Navigate to="/"/>;
      }
      else
      {
        return <Component/>
      
      }
    }
    else
    {
      return <div>Loading</div>
    }
   
  }
  return WrapperComponent;
}
