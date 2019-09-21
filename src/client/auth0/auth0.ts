/* eslint-disable @typescript-eslint/camelcase */
import jwtDecode from 'jwt-decode'
import queryString, { ParsedQuery } from 'query-string'
import Auth0Lock from 'auth0-lock'

class Auth0 {
  private auth0Lock?: Auth0LockStatic

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

  private setToken = ({ access_token, id_token, expires_in }: ParsedQuery) => {
    // TODO Lookup better way
    access_token = access_token as string
    id_token = id_token as string
    expires_in = expires_in as string

    const localStorage = window.localStorage
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('idToken', id_token)
    localStorage.setItem(
      'expiresAt',
      (parseInt(expires_in) * 1000 + new Date().getTime()).toString()
    )
    localStorage.setItem('user', JSON.stringify(jwtDecode(id_token)))
  }

  private getQueryParams = () => {
    return queryString.parse(window.location.hash)
  }

  private setTokenByQuery = () => {
    this.setToken(this.getQueryParams())
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
    this.setTokenByQuery()
  }

  public logout = () => {
    this.unsetToken()
  }
}

const auth0 = new Auth0()
export default auth0
