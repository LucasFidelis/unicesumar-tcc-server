require('dotenv').config()

export const env = {
  port: process.env.PORT,
  privateKey: process.env.PRIVATE_KEY!
}