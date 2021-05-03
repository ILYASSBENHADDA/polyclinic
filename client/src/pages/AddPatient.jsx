import React, { useState, useEffect } from 'react'
import Nav from "./partials/Nav"
import axios from 'axios'

function AddPatient() {

     const [patient, setPatient] = useState({
          first_name: '',
          last_name: '',
          cin: '',
          birth_date: '',
          specialty: ''
     })

     const [specialty, setSpecialty] = useState([])
     const [message, setMessage] = useState('')

     // Get doctors spisiality
     useEffect(() => {
          axios.get('http://localhost:4000/api/doctor-spc').then(response => {
               console.log(response)
               setSpecialty(response.data)
          })
     }, [])

     // onChange inputs
     const onChange = (e) => {
          setPatient({...patient, [e.target.name]: e.target.value})
     }

     // Add patient
     const newPatient = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/add-patient', patient).then(response => {
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
               <h1>Register Patient</h1>

               <form onSubmit={newPatient}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input type="text" className="form-control" name="first_name" value={patient.first_name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type="text" className="form-control" name="last_name" value={patient.last_name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>CIN</label>
                         <input type="text" className="form-control" name="cin" value={patient.cin} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                         <label>Birth Date</label>
                         <input type="text" className="form-control" name="birth_date" value={patient.birth_date} onChange={onChange}/>
                    </div>
                    {/* <div className="form-group">
                         <label>Doctor</label>
                         <input type="text" className="form-control" name="doctor_aid" value={patient.doctor_aid} onChange={onChange}/>
                    </div> */}
                    <div className="form-group">
                              <label>Doctor</label>
                              <select className="custom-select" name="specialty" value={patient.specialty} onChange={onChange}>
                              <option>Spesiality...</option>
                              {specialty.map((val, key) => (
                                   <>
                                   <option key={key} value={val.specialty}>{val.specialty}</option>
                                   </>
                              ))}
                                   
                              </select>
                    </div>


                    <button type="submit" className="btn btn-primary">Add patient</button>
               </form>
               {/* ALERT */}
               {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
     
               </div>
          </div>
          </>
     )
}


export default AddPatient