import { Router, Request, Response } from 'express';
import { RouterAdapter } from './RouterAdapter';
import { CriarPedidoController } from '../controllers/Pedidos/CriarPedidoController';
import { PedidoRepository } from '../application/repositories/PedidoRepository';
import { PedidoPrismaRepository } from '../infra/prisma/PedidoPrismaRepository';
import { DeletarPedidoController } from '../controllers/Pedidos/DeletarPedidoController';
import { ListPedidosController } from '../controllers/Pedidos/ListPedidosController';
import { AtualizarPedidoController } from '../controllers/Pedidos/AtualizarPedidoController';
import { GetPedidoController } from '../controllers/Pedidos/GetPedidoController';
import { AtualizarProdutoController } from '../controllers/Pedidos/Produtos/AtualizarProdutoController';
import { DeletarProdutoController } from '../controllers/Pedidos/Produtos/DeletarProdutoController';
import { makeSeparacaoRepository } from './SeparacaoRoutes';
import fs from 'fs';
import { makeGetCanalVendaController } from './CanaisVendaRoutes';

export const makePedidoRoutes = (router: Router) => {
  router.get('/pedidos', RouterAdapter(makeListPedidosController()))
  router.get('/pedidos/:id', RouterAdapter(makeGetPedidoController()))
  router.post('/pedidos', RouterAdapter(makeCriarPedidoController()))
  router.post('/pedidos/:id', RouterAdapter(makeAtualizarPedidoController()))
  router.post('/pedidos/:id/produtos/:produtoId', RouterAdapter(makeAtualizarProdutoController()))
  router.delete('/pedidos/:id', RouterAdapter(makeDeletarPedidoController()))
  router.delete('/pedidos/:id/produtos/:produtoId', RouterAdapter(makeDeletarProdutoController()))
  router.get('/pedidos/:id/imprimir', makeImprimirPedido)
}

export const makePedidoRepository = (): PedidoRepository => {
  return new PedidoPrismaRepository()
}

const makeCriarPedidoController = (): CriarPedidoController => {
  return new CriarPedidoController(makePedidoRepository())
}

const makeDeletarPedidoController = (): DeletarPedidoController => {
  return new DeletarPedidoController(makePedidoRepository(), makeSeparacaoRepository())
}

const makeListPedidosController = (): ListPedidosController => {
  return new ListPedidosController(makePedidoRepository())
}

const makeAtualizarPedidoController = (): AtualizarPedidoController => {
  return new AtualizarPedidoController(makePedidoRepository())
}

const makeGetPedidoController = (): GetPedidoController => {
  return new GetPedidoController(makePedidoRepository())
}

const makeAtualizarProdutoController = (): AtualizarProdutoController => {
  return new AtualizarProdutoController(makePedidoRepository())
}

const makeDeletarProdutoController = (): DeletarProdutoController => {
  return new DeletarProdutoController(makePedidoRepository())
}

const makeImprimirPedido = async (request: Request, response: Response) => {
  const { id } = request.params
  const getPedido = makeGetPedidoController()
  const getCanal = makeGetCanalVendaController()
  const pedidoOutput = await getPedido.handle({ body: { id }})
  const { identificadorLoja, nomeCliente, emissao, canalVendaId, produtos } = pedidoOutput.body
  const canalOutput = await getCanal.handle({ body: { id: canalVendaId }})
  const { nome } = canalOutput.body
  const path = __dirname + '/../view/pedido.html';
  let pedidoTemplate = fs.readFileSync(path).toString()
  const replaces = {
    'IDENTIFICADOR_PEDIDO': identificadorLoja,
    'EMISSAO': (new Date(emissao).toLocaleDateString('pt-BR')),
    'CANAL_VENDA': nome,
    'CLIENTE_NOME': nomeCliente,
    'PRODUTOS': produtos.map((produto) => `<tr><td>${produto.nome}</td><td>${produto.quantidade}</td></tr>`).join('')
  }
  for (const [key, value] of Object.entries(replaces)) {
    pedidoTemplate = pedidoTemplate.replace(key, value)
  }
  return response.send(pedidoTemplate)
}