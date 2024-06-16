import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Separacao } from '../../models/Separacao';
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller';

export class DeletarSeparacaoController implements Controller {
  constructor (
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { separacaoId } = request.body
    const separacao = await this.separacaoRepository.get(separacaoId)    
    if (separacao.status == 'finalizado') {
      return badRequest('Separação se encontra finalizada');
    }
    await this.separacaoRepository.delete(separacao)
    return { statusCode: 200, body: separacao.toJson() }
  }
}