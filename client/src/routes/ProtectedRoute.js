import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ isAuth, component: Component, ...rest }) {
     return (
          <Route
               {...rest}
               render={() => {
                    // if(isAuth) {
                    //      return <Component/>
                    // } else {
                    //      return (
                    //           <Redirect to='/login' />
                    //      )
                    // }
                    return ( isAuth ? <Component/> : <Redirect to='/login' /> )
                    // return ( isAuth ? <Component/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> )
               }}
          />
     )
}

export default ProtectedRoute
