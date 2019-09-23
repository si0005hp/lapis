import * as React from 'react'
import { apiGet, apiPost } from '../api/api'
import axios from 'axios'

// TODO Delete me later as it's totally a test component
const Ping: React.FC = () => {
  const ping = async () => {
    try {
      const { data } = await apiGet('/api/ping')
      console.log(`id: ${data.id} (${typeof data.id})`)
      console.log(`msg: ${data.msg} (${typeof data.msg})`)
    } catch (e) {
      console.error(e.response.data)
    }
  }

  const authTest = async () => {
    try {
      const { data } = await apiGet('/api/auth-test')
      console.log(data.msg)
    } catch (e) {
      console.error(e.response.data)
    }
  }

  const userGetTest = async () => {
    try {
      const { data } = await axios.get('/api/users')
      console.log(data)
    } catch (e) {
      console.error(e.response.data)
    }
  }

  const userPostTest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') as string)
      const { data } = await apiPost('/api/users', { user: { sub: user.sub } })
      console.log(data)
    } catch (e) {
      console.error(e.response.data)
    }
  }

  return (
    <div className="Ping">
      <h1>Ping page</h1>
      <button onClick={ping}>PING</button>
      <button onClick={authTest}>AUTH TEST</button>
      <button onClick={userGetTest}>USER GET TEST</button>
      <button onClick={userPostTest}>USER POST TEST</button>
    </div>
  )
}

export default Ping
