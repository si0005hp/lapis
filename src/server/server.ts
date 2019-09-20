import Express from 'express'
import * as path from 'path'
import { authenticate } from './auth0/auth0'

const app = Express()
const projectRootPath = `${__dirname}/../../`
const serverPort = 4000

app.use(Express.static(path.join(projectRootPath, 'dist/client')))

app.get('/api/test', (req, res) => {
  res.send({ data: 'test' })
})

app.get('/api/authenticate-test', authenticate, (req, res) => {
  res.send({ data: 'authenticate-test' })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(projectRootPath, 'dist/client', 'index.html'))
})

app.listen(serverPort, () => {
  console.log(`Server started at port ${serverPort} ...`)
})
