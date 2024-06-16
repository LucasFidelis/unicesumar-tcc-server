import { Router } from 'express'
import { RouterAdapter } from './RouterAdapter'
import { ListarSeparacoesController } from '../controllers/Separacao/ListarSeparacaoController'
import { SeparacaoRepository } from '../application/repositories/SeparacaoRepository'
import { SeparacaoPrismaRepository } from '../infra/prisma/SeparacaoPrismaRepository'
import { IniciarSeparacaoController } from '../controllers/Separacao/IniciarSeparacaoController'
import { DeletarSeparacaoController } from '../controllers/Separacao/DeletarSeparacaoController'
import { FinalizarSeparacaoController } from '../controllers/Separacao/FinalizarSeparacaoController'

export const makeSeparacaoRoutes = (router: Router) => {
  router.post('/separacoes', RouterAdapter(makeIniciarSeparacaoController()))
  router.get('/separacoes', RouterAdapter(makeListSeparacoesController()))
  router.post('/separacoes/:separacaoId/finalizar', RouterAdapter(makeFinalizarSeparacaoController()))
  // router.get('/separadores/:id', RouterAdapter(makeGetSeparadorController()))
  router.delete('/separacoes/:separacaoId', RouterAdapter(makeDeletarSeparacaoController()))
}

export const makeSeparacaoRepository = (): SeparacaoRepository => {
  return new SeparacaoPrismaRepository()
}

const makeIniciarSeparacaoController = (): IniciarSeparacaoController => {
  return new IniciarSeparacaoController(makeSeparacaoRepository())
}

const makeListSeparacoesController = (): ListarSeparacoesController => {
  return new ListarSeparacoesController(makeSeparacaoRepository())
}

const makeDeletarSeparacaoController = (): DeletarSeparacaoController => {
  return new DeletarSeparacaoController(makeSeparacaoRepository())
}

const makeFinalizarSeparacaoController = (): FinalizarSeparacaoController => {
  return new FinalizarSeparacaoController(makeSeparacaoRepository())
}