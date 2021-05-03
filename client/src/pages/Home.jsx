import React from 'react'
import Nav from './partials/Nav'
import logo from '../img/hospital_logo.png'

export default function Home() {
     return (
          <>
          <Nav />
               <div className="text-center mt-5">                    
                    <img src={logo} alt='Logo Hospital'/>
                    <h2 className="mt-2">Hospital</h2>
               </div>
          </>
     )
}
