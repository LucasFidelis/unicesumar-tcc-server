import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { Produto } from '../../models/Produto';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class AtualizarPedidoController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id, nomeCliente, canalVendaId, emissao } = request.body
    const pedido = await this.pedidoRepository.findById(id)
    if (nomeCliente) pedido.nomeCliente = nomeCliente
    if (canalVendaId) pedido.canalVendaId = canalVendaId
    if (emissao) pedido.emissao = new Date(emissao)
    if (request.body.produtos) {
      pedido.removeProdutos()
      for (const produtoData of request.body.produtos) {
        const produto = Produto.create(produtoData.nome, produtoData.quantidade)
        pedido.addProduto(produto)
      }
    }
    await this.pedidoRepository.save(pedido)
    return { statusCode: 200, body: pedido.toJson() }
  }
}