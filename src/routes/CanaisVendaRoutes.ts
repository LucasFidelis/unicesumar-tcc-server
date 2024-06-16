import { Router } from 'express';
import { RouterAdapter } from './RouterAdapter';
import { CanalVendaRepository } from '../application/repositories/CanalVendaRepository';
import { CanalVendaPrismaRepository } from '../infra/prisma/CanalVendaPrismaRepository';
import { CreateCanalVendaController } from '../controllers/CanaisVenda/CreateCanalVendaController';
import { GetCanalVendaController } from '../controllers/CanaisVenda/GetCanalVendaController';
import { ListCanaisVendaController } from '../controllers/CanaisVenda/ListCanaisVendaController';
import { DeleteCanalVendaController } from '../controllers/CanaisVenda/DeleteCanalVendaController';
import { UpdateCanalVendaController } from '../controllers/CanaisVenda/UpdateCanalVendaController';
import { makePedidoRepository } from './PedidoRoutes';

export const makeCanaisVendaRoutes = (router: Router) => {
  router.get('/canais_venda', RouterAdapter(makeListCanaisVendaController()))
  router.get('/canais_venda/:id', RouterAdapter(makeGetCanalVendaController()))
  router.post('/canais_venda', RouterAdapter(makeCreateCanalVendaController()))
  router.post('/canais_venda/:id', RouterAdapter(makeUpdateCanalVendaController()))
  router.delete('/canais_venda/:id', RouterAdapter(makeDeleteCanalVendaController()))
}

const makeCanalVendaRepository = (): CanalVendaRepository => {
  return new CanalVendaPrismaRepository()
}

const makeCreateCanalVendaController = (): CreateCanalVendaController => {
  return new CreateCanalVendaController(makeCanalVendaRepository())
}

export const makeGetCanalVendaController = (): GetCanalVendaController => {
  return new GetCanalVendaController(makeCanalVendaRepository())
}

const makeListCanaisVendaController = (): ListCanaisVendaController => {
  return new ListCanaisVendaController(makeCanalVendaRepository())
}

const makeDeleteCanalVendaController = (): DeleteCanalVendaController => {
  return new DeleteCanalVendaController(makeCanalVendaRepository(), makePedidoRepository())
}

const makeUpdateCanalVendaController = (): UpdateCanalVendaController => {
  return new UpdateCanalVendaController(makeCanalVendaRepository())
}