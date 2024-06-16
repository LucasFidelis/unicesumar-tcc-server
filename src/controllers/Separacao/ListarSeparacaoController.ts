import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class ListarSeparacoesController implements Controller {
  constructor (
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const separacoes = await this.separacaoRepository.list()
    const output = separacoes.map(separacao => separacao.toJson())
    return { statusCode: 200, body: output }
  }
}