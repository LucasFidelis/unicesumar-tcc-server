import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Separacao } from '../../models/Separacao';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class FinalizarSeparacaoController implements Controller {
  constructor (
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { separacaoId } = request.body
    const separacao = await this.separacaoRepository.get(separacaoId)
    separacao.status = 'finalizado';
    await this.separacaoRepository.save(separacao)
    return { statusCode: 200, body: separacao.toJson() }
  }
}