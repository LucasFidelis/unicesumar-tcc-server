import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { Pedido } from '../../models/Pedido';
import { Produto } from '../../models/Produto';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class CriarPedidoController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { identificadorLoja, nomeCliente, canalVendaId } = request.body
    const produtosData = request.body.produtos
    const emissao = new Date(request.body.emissao)
    const pedido = Pedido.create({
      identificadorLoja,
      nomeCliente,
      emissao,
      canalVendaId
    })
    for (const produtoData of produtosData) {
      const produto = Produto.create(produtoData.nome, produtoData.quantidade)
      pedido.addProduto(produto)
    }
    await this.pedidoRepository.save(pedido)
    return { statusCode: 200, body: pedido.toJson() }
  }
}