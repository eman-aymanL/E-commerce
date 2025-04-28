import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

export const authContext =createContext()

export default function AuthContextProvider({children}) {



    const [userToken, setuserToken] = useState(function(){
        return localStorage.getItem('tkn')        
})
const [userData, setuserData] = useState(null)

function decrypyusertoken(){
  const res =jwtDecode(userToken)
  console.log('user data', res)
  setuserData(res)
}
useEffect(() => {
  if(userToken){
    decrypyusertoken()
  }
}, [userToken])


  return (
    <authContext.Provider value={{
        setuserToken,
        userToken,
        userData
    }}>
    {children}        
    </authContext.Provider>
  )
}
