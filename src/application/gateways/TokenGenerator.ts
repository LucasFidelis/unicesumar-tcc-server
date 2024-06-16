import { TokenExpiredError, sign, verify } from 'jsonwebtoken'
import { env } from '../../env'
import { ExpiredToken } from '../errors/ExpiredToken'

export class TokenGenerator {
  static generate (input: ({sub: string, expiresIn: number})): string {
    return sign({ sub: input.sub }, env.privateKey, { expiresIn: input.expiresIn })
  }

  static async decrypt (cipherText: string): Promise<string> {
    try {
      const payload = verify(cipherText, env.privateKey)
      return JSON.stringify(payload)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredToken()
      } else {
        throw error
      }
    }
  }
}