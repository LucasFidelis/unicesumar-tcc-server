import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository'
import { Controller, HttpRequest, HttpResponse } from '../Controller'

export class GetCanalVendaController implements Controller {
  constructor (
    private readonly canalVendaRepository: CanalVendaRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const canalVenda = await this.canalVendaRepository.findById(id)
    return { statusCode: 200, body: canalVenda.toJson() }
  }
}