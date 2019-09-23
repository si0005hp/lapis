import * as React from 'react'
import { Switch, Redirect, Route, withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import auth0 from './auth0/auth0'
import Main from './components/Main'
import Login from './components/Login'
import * as userActions from './actions/user'
import { Dispatch, bindActionCreators } from 'redux'

interface DispatchProps {
  userActions: {
    createUser: (sub: string) => (dispatch: Dispatch) => Promise<void>
  }
}

type AppProps = DispatchProps & RouteComponentProps<{}>

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch)
})

const App: React.FC<AppProps> = ({ userActions }) => {
  const loginCallback = () => {
    auth0.login(userActions.createUser)
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

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
)
