import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedAuthRoute({ isAuth, component: Component, ...rest}) {
     return (
          <Route
               {...rest}
               render={() => !isAuth ? <Component/> : <Redirect to='/dashboard' />}
          />
     )
}

export default ProtectedAuthRoute