import React, { useEffect } from 'react'
import auth0 from '../auth0/auth0'
import { RouteComponentProps } from 'react-router'

const Login: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const auth0LockContainer = 'show-auth'

  useEffect(() => {
    if (auth0.isAuthenticated()) {
      history.push('/main')
    } else {
      auth0.showAuth0Lock(auth0LockContainer)
    }
  })
  return <div id={auth0LockContainer} />
}

export default Login
