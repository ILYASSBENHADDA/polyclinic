import React, { useState } from 'react'
import axios from 'axios'
import Nav from "./partials/Nav"
axios.defaults.withCredentials = true

function Login() {

     const [user, setUser] = useState({
          username: '',
          password: ''
     })

     const [message, setMessage] = useState('')

     // onChange inputs
     const onChange = (e) => {
          setUser({...user, [e.target.name]: e.target.value})
     }

     // Login
     const login = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/login', user, { withCredentials: true }).then(response => {
               console.log(response.data.message)
               setMessage(response.data.message)
               // Reload page
               setTimeout(()=> { window.location.reload() }, 1000)
          })
          .catch(error => { console.log(error)})
     }

     return (
          <>
          <Nav/>
          
          <div className="container">
          <div className="col-lg-8 py-4">
               <h1>Login</h1>
               <form onSubmit={login}>
                    <div className="form-group">
                         <label>Username</label>
                         <input type="text" className="form-control" name="username" value={user.username} onChange={onChange} required/>
                    </div>

                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" name="password" value={user.password} onChange={onChange} required/>
                    </div>

                    <button className="btn btn-primary">Login</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
          </div>
          </div>
          </>
     )
}


export default Login