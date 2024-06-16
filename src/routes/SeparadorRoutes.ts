import { Router } from 'express';
import { RouterAdapter } from './RouterAdapter';
import { CreateSeparadorController } from '../controllers/Separadores/CreateSeparadorController';
import { SeparadorRepository } from '../application/repositories/SeparadorRepository';
import { SeparadorPrismaRepository } from '../infra/prisma/SeparadorPrismaRepository';
import { ListSeparadoresController } from '../controllers/Separadores/ListSeparadoresController';
import { GetSeparadorController } from '../controllers/Separadores/GetSeparadorController';
import { UpdateSeparadorController } from '../controllers/Separadores/UpdateSeparadorController';
import { DeleteSeparadorController } from '../controllers/Separadores/DeleteSeparadorController';
import { makeSeparacaoRepository } from './SeparacaoRoutes';

export const makeSeparadorRoutes = (router: Router) => {
  router.post('/separadores', RouterAdapter(makeCreateSeparadorController()))
  router.post('/separadores/:id', RouterAdapter(makeUpdateSeparadorController()))
  router.get('/separadores', RouterAdapter(makeListSeparadoresController()))
  router.get('/separadores/:id', RouterAdapter(makeGetSeparadorController()))
  router.delete('/separadores/:id', RouterAdapter(makeDeleteSeparadorController()))
}

const makeSeparadorRepository = (): SeparadorRepository => {
  return new SeparadorPrismaRepository()
}

const makeCreateSeparadorController = (): CreateSeparadorController => {
  return new CreateSeparadorController(makeSeparadorRepository())
}

const makeListSeparadoresController = (): ListSeparadoresController => {
  return new ListSeparadoresController(makeSeparadorRepository())
}

const makeGetSeparadorController = (): GetSeparadorController => {
  return new GetSeparadorController(makeSeparadorRepository())
}

const makeUpdateSeparadorController = (): UpdateSeparadorController => {
  return new UpdateSeparadorController(makeSeparadorRepository())
}

const makeDeleteSeparadorController = (): DeleteSeparadorController => {
  return new DeleteSeparadorController(makeSeparadorRepository(), makeSeparacaoRepository())
}