import { User } from './../entity/User'
import { Connection } from 'typeorm'
import Express from 'express'

export default (app: Express.Application, connection: Connection) => {
  const repository = connection.getRepository(User)

  app.get('/api/users', async function(_, res, next) {
    try {
      const users = await repository.find()
      res.json(users)
    } catch (e) {
      next(e)
    }
  })

  app.post('/api/users', async function(req, res, next) {
    try {
      const user = repository.create(req.body)
      const results = await repository.save(user)
      return res.send(results)
    } catch (e) {
      next(e)
    }
  })
}
