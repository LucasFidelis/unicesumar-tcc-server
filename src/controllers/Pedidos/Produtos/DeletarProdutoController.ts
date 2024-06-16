import { PedidoRepository } from '../../../application/repositories/PedidoRepository';
import { Controller, HttpRequest, HttpResponse } from '../../Controller';

export class DeletarProdutoController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id, produtoId } = request.body
    const pedido = await this.pedidoRepository.findById(id)
    pedido.removeProduto(produtoId)
    await this.pedidoRepository.save(pedido)
    return {statusCode: 200, body: pedido.toJson() }
  }
}