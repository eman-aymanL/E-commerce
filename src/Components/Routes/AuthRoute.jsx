import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AuthRoute({children}) {
    if(localStorage.getItem('tkn')!=null){
        return <Navigate to='/home'/>
    }
  return children;
}
