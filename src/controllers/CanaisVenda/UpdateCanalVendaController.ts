import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository'
import { Controller, HttpRequest, HttpResponse } from '../Controller'

export class UpdateCanalVendaController implements Controller {
  constructor (
    private readonly canalVendaRepository: CanalVendaRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id, nome, prioridade } = request.body
    const canalVenda = await this.canalVendaRepository.findById(id)
    if (nome) canalVenda.nome = nome
    if (prioridade) canalVenda.prioridade = prioridade
    await this.canalVendaRepository.save(canalVenda)
    return { statusCode: 200, body: canalVenda.toJson() }
  }
}