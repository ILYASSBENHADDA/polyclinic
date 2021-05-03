import React, { useEffect } from 'react'
import axios from 'axios'
import Nav from "./partials/Nav"
import logo from '../img/hospital_logo.png'



function Dashboard() {
     useEffect(() => {
          axios.get('http://localhost:4000/api/add-wr').then(response => {
               console.log(response)
          })
     }, [])
     // window.location.reload()
     
     return (
          <>
               <Nav />
               <div className="text-center mt-5">                    
                    <img src={logo} alt='Logo Hospital'/>
                    <h2 className="mt-2">WELCOME BACK</h2>
               </div>
          </>
     )
}

export default Dashboard