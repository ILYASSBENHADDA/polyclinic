import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
// import Home from '../pages/Home'
import NotFound from '../pages/404'
import AddDoctor from '../pages/AddDoctor'
import AddPatient from '../pages/AddPatient'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import ReqList from '../pages/ReqList'
import ProtectedAuthRoute from './ProtectedAuthRoute'
import ProtectedRoute from './ProtectedRoute'

function Routes() {

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
               <Router>
                    <Switch>
                         <Route exact path="/" component={Home}/>
                         <Route exact path="/logout" component={Logout}/>

                         <ProtectedAuthRoute exact path="/register" component={Register} isAuth={isAuth} />
                         <ProtectedAuthRoute exact path="/login" component={Login} isAuth={isAuth} />

                         <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
                         <ProtectedRoute exact path="/add-doctor" component={AddDoctor} isAuth={isAuth} />
                         <ProtectedRoute exact path="/add-patient" component={AddPatient} isAuth={isAuth} />
                         <ProtectedRoute exact path="/requists" component={ReqList} isAuth={isAuth} />
                         <Route exact path="/404" component={NotFound} />
                         <Redirect to="/404" />
                    </Switch>
               </Router>
          </>
     )
}


export default Routes