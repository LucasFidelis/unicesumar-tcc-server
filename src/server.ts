import express, { Router, json } from 'express'
import cors from 'cors'
import { env } from './env'
import { makeCanaisVendaRoutes } from './routes/CanaisVendaRoutes'
import { PrismaHelper } from './infra/prisma/PrismaHelper'
import { makeSeparadorRoutes } from './routes/SeparadorRoutes'
import { makePedidoRoutes } from './routes/PedidoRoutes'
import { makeUsuarioRoutes } from './routes/UsuarioRoutes'
import { makeAuthRoutes } from './routes/AuthRoutes'
import { makeSeparacaoRoutes } from './routes/SeparacaoRoutes'

const app = express()
const router = Router()
makeAuthRoutes(router)
makeUsuarioRoutes(router)
makeCanaisVendaRoutes(router)
makeSeparadorRoutes(router)
makePedidoRoutes(router)
makeSeparacaoRoutes(router)
app.use(json())
app.use(cors())
app.use(router)

PrismaHelper.connect()
app.listen(env.port, () => console.log(`Server running at 0.0.0.0:${env.port}`))