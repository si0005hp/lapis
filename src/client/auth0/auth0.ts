/* eslint-disable @typescript-eslint/camelcase */
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import Auth0Lock from 'auth0-lock'
import { IdTokenDecoded } from '../../common/types/auth0'
import * as userActions from '../actions/user'

class Auth0 {
  private auth0Lock?: Auth0LockStatic
  private callbackErrorMessage = (prop: string) =>
    `[Error at Auth0 login callback] ${prop} was not returned by Auth0`

  private getAuth0Lock = (container: string) => {
    if (!this.auth0Lock) {
      this.auth0Lock = new Auth0Lock(
        process.env.AUTH0_CLIENTID || '',
        process.env.AUTH0_DOMAIN || '',
        {
          container,
          closable: false,
          auth: {
            responseType: 'token id_token',
            redirectUrl: 'http://localhost:9000' + '/callback', // TODO
            params: {
              scope: 'openid profile email'
            }
          }
        }
      )
    }
    return this.auth0Lock
  }

  public showAuth0Lock = (container: string) => this.getAuth0Lock(container).show()

  private getQueryParams = () => {
    return queryString.parse(window.location.hash)
  }

  public isAuthenticated = () => {
    const expiresAt = window.localStorage.getItem('expiresAt')
    return expiresAt ? new Date().getTime() < parseInt(expiresAt) : false
  }

  private unsetToken = () => {
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('user')
  }

  public getIdToken = () => {
    return this.isAuthenticated() ? localStorage.getItem('idToken') : null
  }

  public getUser = () => {
    if (!this.isAuthenticated()) return null

    const user = localStorage.getItem('user')
    return user !== null ? JSON.parse(user) : null
  }

  public loginCallback = () => {
    const { access_token, id_token, expires_in } = this.getQueryParams()
    if (!access_token) throw new Error(this.callbackErrorMessage('access_token'))
    if (!id_token) throw new Error(this.callbackErrorMessage('id_token'))
    if (!expires_in) throw new Error(this.callbackErrorMessage('expires_in'))

    // Register/fetch user and set to state
    const idTokenDecoded = jwtDecode<IdTokenDecoded>(id_token as string)
    if (!idTokenDecoded.sub) throw new Error(this.callbackErrorMessage('id_token.sub'))
    userActions.createUser(idTokenDecoded.sub)

    // Set credentials in local strage
    this.setToken(access_token as string, id_token as string, expires_in as string, idTokenDecoded)
  }

  private setToken = (
    access_token: string,
    id_token: string,
    expires_in: string,
    idTokenDecoded: IdTokenDecoded
  ) => {
    const localStorage = window.localStorage
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('idToken', id_token)
    localStorage.setItem(
      'expiresAt',
      (parseInt(expires_in) * 1000 + new Date().getTime()).toString()
    )
    localStorage.setItem('user', JSON.stringify(idTokenDecoded))
  }

  public logout = () => {
    this.unsetToken()
  }
}

const auth0 = new Auth0()
export default auth0
