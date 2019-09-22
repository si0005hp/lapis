import { User } from './index'

export interface GET {
  '/api/ping': {
    res: {
      id: number
      msg: string
    }
  }
  '/api/auth-test': {
    res: {
      msg: string
    }
  }
}

export interface POST {
  '/api/users': {
    req: {
      body: { user: { sub: string } }
    }
    res: {
      user: User
    }
  }
}
