import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router'
import auth0 from './auth0/auth0'
import Main from './components/Main'
import Login from './components/Login'
import LoginCallbackPage from './components/LoginCallbackPage'

const App: React.FC = () => {
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
        <Route exact path="/callback" component={LoginCallbackPage} />
        <Route exact path="/main" render={withAuthMain} />
        <Redirect to="/main" />;
      </Switch>
    </div>
  )
}

export default App
