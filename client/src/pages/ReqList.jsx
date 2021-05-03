import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from "./partials/Nav"

function ReqList() {
     const [reqlist, setReqlist] = useState([])
     useEffect(() => {
          axios.get('http://localhost:4000/api/requists').then(response => {
               console.log(response)
               setReqlist(response.data)
          })
     }, [])



     const valid = (id) => {
          
          const ask = window.confirm('Are you want to validate?')
          if (ask === true) {
               axios.post('http://localhost:4000/api/update-status', {id}).then(response => {
                    console.log(response)
               })
          }
     }

     return (
          <>
          <Nav/>
          
          <div className="container">
               <h1>Requists</h1>

               <div className="row">     
                    <table className="table mt-4">
                         {/* Header Table */}
                         <thead className="thead-dark">
                         <tr>
                              <th>Order Num</th>
                              <th>Doctor</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Status</th>
                         </tr>
                         </thead>

                         {/* Body Table */}
                         <tbody>

                         {reqlist.map((val, key) => (
                              <tr key={key}>
                                   <th>{val.order_num}</th>
                                   <td>{val.id_doctor.specialty}</td>
                                   <td>{val.id_patient.first_name}</td>
                                   <td>{val.id_patient.last_name}</td>
                                   <td><button onClick={()=>{valid(val._id)}} className="btn btn-primary">{val.status ? "APROVED" : "PANDING"}</button></td>
                              </tr>
                         ))}

                         </tbody>
                    </table>
               </div>
          </div>
          </>
     )
}

export default ReqList