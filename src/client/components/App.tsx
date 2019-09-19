import * as React from 'react'

type Props = {
  title: string
  body: string
}

const App: React.FC<Props> = ({ title, body }) => (
  <div id="App">
    <h1>{title}</h1>
    <p>{body}</p>
  </div>
)

export default App
