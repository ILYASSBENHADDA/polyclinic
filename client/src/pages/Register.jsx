import axios from 'axios'
import React, { useState } from 'react'
import Nav from "./partials/Nav"

function Register() {

     const [user, setUser] = useState({
          username: '',
          password: ''
     })

     const [message, setMessage] = useState('')

     // onChange inputs
     const onChange = (e) => {
          setUser({...user, [e.target.name]: e.target.value})
     }

     // register
     const register = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/register', user).then(response => {
               console.log(response.data.message)
               setMessage(response.data.message)
          })
          .catch(error => { console.log(error)})
     }

     return (
          <>
          <Nav/>
          
          <div className="container">
          <div className="col-lg-8 py-4">
               <h1>Register</h1>
               <form onSubmit={register}>
                    <div className="form-group">
                         <label>Username</label>
                         <input type="text" className="form-control" name="username" value={user.username} onChange={onChange} required/>
                    </div>

                    <div className="form-group">
                         <label>Password</label>
                         <input type="password" className="form-control" name="password" value={user.password} onChange={onChange} required/>
                    </div>

                    <button className="btn btn-primary">Register</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
          </div>
          </div>
          </>
     )
}


export default Register