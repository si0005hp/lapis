import * as React from 'react'
import { apiGet } from '../api/api'

const Main: React.FC = () => {
  const ping = async () => {
    const { data } = await apiGet('/api/ping')
    console.log(data.msg)
  }

  const authTest = async () => {
    const { data } = await apiGet('/api/auth-test')
    console.log(data.msg)
  }

  return (
    <div className="Main">
      <h1>Main</h1>
      <button onClick={ping}>PING</button>
      <button onClick={authTest}>AUTH TEST</button>
    </div>
  )
}

export default Main
