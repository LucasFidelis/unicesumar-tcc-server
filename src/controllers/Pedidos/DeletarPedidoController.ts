import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Pedido } from '../../models/Pedido';
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller';

export class DeletarPedidoController implements Controller {
  constructor (
    private readonly pedidoRepository: PedidoRepository,
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const separacao = await this.separacaoRepository.findByPedido(id)
    const pedido = await this.pedidoRepository.findById(id)
    if (separacao) return badRequest(`Pedido ${pedido.identificadorLoja} com operação de separação pendente/finalizada!`)
    await this.pedidoRepository.delete(id)
    return { statusCode: 200 }
  }
}