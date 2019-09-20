import { Request, Response, NextFunction } from 'express'
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken'
import JwksRsa, { CertSigningKey, RsaSigningKey } from 'jwks-rsa'
import dotenv from 'dotenv'

dotenv.config()
const jwksClient = JwksRsa({ jwksUri: process.env.AUTH0_JWKS })

function isCertSigningKey(key: CertSigningKey | RsaSigningKey): key is CertSigningKey {
  return (key as CertSigningKey).publicKey !== undefined
}

let signingKeyCache: string
function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  if (signingKeyCache) return callback(null, signingKeyCache)

  jwksClient.getSigningKey(header.kid, (_, key) => {
    signingKeyCache = isCertSigningKey(key) ? key.publicKey : key.rsaPublicKey
    callback(null, signingKeyCache)
  })
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization
  jwt.verify(token, getKey, err => {
    if (err) {
      return res.json({ success: false, message: 'Invalid token' })
    }
    next()
  })
}
