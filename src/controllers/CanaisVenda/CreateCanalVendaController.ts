import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository'
import { CanalVenda } from '../../models/CanalVenda'
import { Controller, HttpRequest, HttpResponse } from '../Controller'

export class CreateCanalVendaController implements Controller {
  constructor (
    private readonly canalVendaRepository: CanalVendaRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { nome, prioridade } = request.body
    const canalVenda = CanalVenda.create(nome, prioridade)
    await this.canalVendaRepository.save(canalVenda)
    return { statusCode: 200, body: canalVenda.toJson() }
  }
}