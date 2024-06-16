import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Separador } from '../../models/Separador';
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller';

export class DeleteSeparadorController implements Controller {
  constructor (
    private readonly separadorRepository: SeparadorRepository,
    private readonly separacaoRepository: SeparacaoRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const separacao = await this.separacaoRepository.findBySeparador(id)
    if (separacao && separacao.length > 0) return badRequest('Separador possui pedidos em separação/separados!')
    await this.separadorRepository.delete(id)
    return { statusCode: 200 }
  }
}