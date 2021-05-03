import React, { useState } from 'react'
import Nav from "./partials/Nav"
import axios from 'axios'

function AddDoctor() {

     const [doctor, setDoctor] = useState({
          first_name: '',
          last_name: '',
          specialty: '',
          doctor_aid: '',
          max_daily_cases: ''
     })

     const [message, setMessage] = useState('')

     const onChange = (e) => {
          setDoctor({...doctor, [e.target.name]: e.target.value})
     }



     const newDoctor = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/add-doctor', doctor).then(response => {
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
               <h1>Register doctor</h1>

               <form onSubmit={newDoctor}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input type="text" className="form-control" name="first_name" value={doctor.first_name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type="text" className="form-control" name="last_name" value={doctor.last_name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Specialty</label>
                         <input type="text" className="form-control" name="specialty" value={doctor.specialty} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Actual id</label>
                         <input type="text" className="form-control" name="doctor_aid" value={doctor.doctor_aid} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Max daily cases</label>
                         <input type="number" className="form-control" name="max_daily_cases" value={doctor.max_daily_cases} onChange={onChange}/>
                    </div>


                    <button type="submit" className="btn btn-primary">Add doctor</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
     
               </div>
          </div>
          </>
     )
}


export default AddDoctor