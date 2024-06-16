import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository'
import { PedidoRepository } from '../../application/repositories/PedidoRepository'
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller'

export class DeleteCanalVendaController implements Controller {
  constructor (
    private readonly canalVendaRepository: CanalVendaRepository,
    private readonly pedidoRepository: PedidoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const pedidos = await this.pedidoRepository.findByCanalVendaId(id)
    if (pedidos && pedidos.length > 0) return badRequest('Canal de venda possui pedidos associados!')
    await this.canalVendaRepository.delete(id)
    return { statusCode: 204 }
  }
}