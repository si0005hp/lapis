import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router'
import Main from './components/Main'
import Login from './components/Login'

const App: React.FC = () => (
  <div className="App">
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/main" component={Main} />
      <Redirect to="/main" />;
    </Switch>
  </div>
)

export default App
