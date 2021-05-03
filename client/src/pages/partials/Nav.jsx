import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function Nav() {

     const [isAuth, setIsAuth] = useState(false)
     useEffect(()=> {
          axios.get('http://localhost:4000').then((response) => {
               console.log(response.data)
               setIsAuth(response.data.isAuthenticated)
          })
          .catch(err => { console.log(err) })
     }, [])

     return (
          <>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
               <Link to="/" className="navbar-brand">Home</Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                    <ul className="navbar-nav ml-auto">
                         {isAuth ? 
                         <>
                         <li>
                              <Link className="nav-link" to="/dashboard">Dashboard</Link> 
                         </li>
                         <li>
                              <Link className="nav-link" to="/requists"><i class="fas fa-poll-h"></i> Requists</Link> 
                         </li>
                         <li>
                              <Link className="nav-link" to="/add-patient"><i class="fas fa-user-injured"></i> Add patient</Link> 
                         </li>
                         <li>
                              <Link className="nav-link" to="/add-doctor"><i class="fas fa-user-md"></i> Add doctor</Link> 
                         </li>
                         <li> 
                              <Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt mr-1"></i> log out</Link> 
                         </li>
                         </>
                         : <>
                         <li> 
                              <Link className="nav-link" to="/register">Register</Link> 
                         </li>
                         <li> 
                              <Link className="nav-link" to="/login">Login</Link> 
                         </li>
                          </> }
                    </ul>
               </div>
          </nav> 
          </>
     )
}


export default Nav