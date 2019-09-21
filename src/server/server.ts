import Express from 'express'
import * as path from 'path'
import { authenticate } from './auth0/auth0'

const app: Express.Application = Express()
const projectRootPath = `${__dirname}/../../`
const serverPort = 4000

app.use(Express.static(path.join(projectRootPath, 'dist/client')))

app.get('/api/ping', (_, res) => {
  res.send({ msg: 'pong' })
})

app.get('/api/auth-test', authenticate, (_, res) => {
  res.send({ msg: 'authentication success' })
})

app.get('*', function(_, res) {
  res.sendFile(path.join(projectRootPath, 'dist/client', 'index.html'))
})

app.listen(serverPort, () => {
  console.log(`Server started at port ${serverPort} ...`)
})
