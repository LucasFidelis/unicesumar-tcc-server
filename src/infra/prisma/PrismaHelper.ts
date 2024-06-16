import { PrismaClient } from '@prisma/client'

export const PrismaHelper = {
  client: null as unknown as PrismaClient,
  connect() {
    this.client = new PrismaClient()
  }
}