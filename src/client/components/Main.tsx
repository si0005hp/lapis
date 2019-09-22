import * as React from 'react'
import { apiGet } from '../api/api'
import axios from 'axios'

const Main: React.FC = () => {
  const ping = async () => {
    const { data } = await apiGet('/api/ping')
    console.log(data.msg)
  }

  const authTest = async () => {
    const { data } = await apiGet('/api/auth-test')
    console.log(data.msg)
  }

  const userGetTest = async () => {
    try {
      const res = await axios.get('/api/users')
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  const userPostTest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') as string)
      const res = await axios.post('/api/users', { sub: user.sub })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="Main">
      <h1>Main</h1>
      <button onClick={ping}>PING</button>
      <button onClick={authTest}>AUTH TEST</button>
      <button onClick={userGetTest}>USER GET TEST</button>
      <button onClick={userPostTest}>USER POST TEST</button>
    </div>
  )
}

export default Main
