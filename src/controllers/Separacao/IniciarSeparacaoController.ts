import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Separacao } from '../../models/Separacao';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class IniciarSeparacaoController implements Controller {
  constructor (
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { pedidoId, separadorId } = request.body
    const separacao = Separacao.create(pedidoId, separadorId)
    await this.separacaoRepository.save(separacao)
    return { statusCode: 200, body: separacao.toJson() }
  }
}