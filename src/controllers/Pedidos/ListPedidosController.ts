import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class ListPedidosController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const pedidos = await this.pedidoRepository.list()
    const output = pedidos.map(pedido => pedido.toJson())
    return { statusCode: 200, body: output }
  }
}