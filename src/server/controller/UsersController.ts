import { User } from '../entity/User'
import { User as UserType } from '../../common/types/index'
import { Connection } from 'typeorm'
import Express from 'express'
import createHttpError from 'http-errors'

const entityAsType = (user: User): UserType => (user as any) as UserType // TODO better way

export default (app: Express.Application, connection: Connection) => {
  const repository = connection.getRepository(User)

  app.get('/api/users', async function(_, res, next) {
    try {
      const users = await repository.find()
      res.send({ users: users })
    } catch (e) {
      next(createHttpError(500, e.message))
    }
  })

  app.post('/api/users', async function(req, res, next) {
    try {
      const user = repository.create(req.body.user)
      const result = await repository.save(user)
      return res.send({ user: entityAsType(result) })
    } catch (e) {
      next(createHttpError(500, e.message))
    }
  })
}
