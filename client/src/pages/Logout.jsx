import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Logout() {
     useEffect(()=> {
          axios.get('http://localhost:4000/api/logout').then((response) => {
               console.log('You\'re Logged Out')
          })
     }, [])

     return (
          <>
               <Redirect to="/login" />
          </>
     )
}


export default Logout