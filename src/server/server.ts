import { createConnection } from 'typeorm'
import Express from 'express'
import * as path from 'path'
import { authenticate } from './auth0/auth0'
import usersController from './controller/UsersController'
import bodyParser from 'body-parser'
import { HttpError } from 'http-errors'

createConnection().then(connection => {
  const app: Express.Application = Express()
  const projectRootPath = `${__dirname}/../../`
  const serverPort = 4000

  app.use(Express.static(path.join(projectRootPath, 'dist/client')))
  app.use(bodyParser.json())

  app.get('/api/ping', (_, res) => {
    res.send({ id: 1, msg: 'pong' })
  })

  app.get('/api/auth-test', authenticate, (_, res) => {
    res.send({ msg: 'authentication success' })
  })

  usersController(app, connection)

  app.get('*', function(_, res) {
    res.sendFile(path.join(projectRootPath, 'dist/client', 'index.html'))
  })

  app.use(function(
    err: HttpError,
    req: Express.Request,
    res: Express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: Express.NextFunction
  ) {
    console.log(err)
    res.status(err.status || 500)
    res.send({ error: err.message })
  })

  app.listen(serverPort, () => {
    console.log(`Server started at port ${serverPort} ...`)
  })
})
