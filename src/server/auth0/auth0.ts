import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken'
import JwksRsa, { CertSigningKey, RsaSigningKey } from 'jwks-rsa'
import dotenv from 'dotenv'
import { IdTokenDecoded } from '../../common/types/auth0'

dotenv.config()
const jwksClient = JwksRsa({ jwksUri: process.env.AUTH0_JWKS as string }) // TODO Fix as string

const isCertSigningKey = (key: CertSigningKey | RsaSigningKey): key is CertSigningKey => {
  return (key as CertSigningKey).publicKey !== undefined
}

let signingKeyCache: string
const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
  if (signingKeyCache) return callback(null, signingKeyCache)
  if (!header.kid) return callback('Invalid token: jwt token header is missing kid')

  jwksClient.getSigningKey(header.kid, (_, key) => {
    signingKeyCache = isCertSigningKey(key) ? key.publicKey : key.rsaPublicKey
    callback(null, signingKeyCache)
  })
}

// TODO any
export const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization
  jwt.verify(token, getKey, (err, decoded) => {
    const idTokenDecoded = decoded as IdTokenDecoded
    if (err) {
      return res.json({ success: false, message: 'Invalid token: Failed to verify jwt token' })
    }
    req.params.sub = idTokenDecoded.sub
    next()
  })
}
