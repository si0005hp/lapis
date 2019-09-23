import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import auth0 from '../auth0/auth0'
import * as userActions from '../actions/user'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from '../../common/types'
import { bindActionCreators, Dispatch } from 'redux'
import { RootState } from '../reducers'
import { Link } from 'react-router-dom'

interface StateProps {
  user: User | null
  loginError: string | null
}

interface DispatchProps {
  setLoginUser: (user: User) => void
  setLoginError: (error: string) => void
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  loginError: state.user.loginError
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setLoginUser: (user: User) => userActions.setLoginUser(user),
      setLoginError: (error: string) => userActions.setLoginError(error)
    },
    dispatch
  )

const LoginCallbackPage: React.FC<Props> = ({
  user,
  loginError,
  setLoginUser,
  setLoginError,
  history
}) => {
  useEffect(() => {
    if (auth0.isAuthenticated()) {
      history.push('/main')
    } else {
      auth0.login(setLoginUser, setLoginError)
    }
  }, [])

  useEffect(() => {
    if (user) {
      history.push('/main')
    }
  }, [user])

  return loginError ? (
    <div>
      <p>Login failed</p>
      <Link to="/login">back to login page</Link>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginCallbackPage)
)
