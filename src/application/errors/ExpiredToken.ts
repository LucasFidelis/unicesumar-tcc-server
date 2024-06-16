export class ExpiredToken extends Error {
  constructor () {
    super('Token is incorrect or has expired')
    this.name = 'ExpiredToken'
  }
}