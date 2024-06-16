import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class GetPedidoController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const pedido = await this.pedidoRepository.findById(id)
    return { statusCode: 200, body: pedido.toJson() }
  }
}