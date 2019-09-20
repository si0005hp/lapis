import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router'
import auth0 from './auth0/auth0'
import Main from './components/Main'
import Login from './components/Login'

const App: React.FC = () => {
  const loginCallback = () => {
    auth0.loginCallback()
    return <Redirect to="/main" />
  }

  const logout = () => {
    auth0.logout()
    return <Redirect to="/login" />
  }

  const withAuthMain = () => (auth0.isAuthenticated() ? <Main /> : <Redirect to="/login" />)

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" render={logout} />
        <Route exact path="/callback" render={loginCallback} />
        <Route exact path="/main" render={withAuthMain} />
        <Redirect to="/main" />;
      </Switch>
    </div>
  )
}

export default App
