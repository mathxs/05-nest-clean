import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'

const prisma = new PrismaClient()
const databaseURL = generateUniqueDataBaseURL(randomUUID())

function generateUniqueDataBaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeAll(async () => {
  process.env.DATABASE_URL = databaseURL
  console.log('databaseURL: ', databaseURL)
  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${databaseURL}" CASCADE;`,
  )
  await prisma.$disconnect()
})
