import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository'
import { Controller, HttpRequest, HttpResponse } from '../Controller'

export class ListCanaisVendaController implements Controller {
  constructor (
    private readonly canalVendaRepository: CanalVendaRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const canaisVenda = await this.canalVendaRepository.list()
    const output = canaisVenda.map(canalVenda => canalVenda.toJson())
    return { statusCode: 200, body: output }
  }
}