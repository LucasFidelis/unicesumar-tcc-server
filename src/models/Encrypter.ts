import bcrypt from 'bcrypt'

export class Encrypter {
  static saltRounds = 12;
  
  static encrypt (plaintext: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds)
    return bcrypt.hashSync(plaintext, salt)
  }

  static async compare (plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}