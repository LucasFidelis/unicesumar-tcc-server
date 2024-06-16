import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Separador } from '../../models/Separador';
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller';

export class CreateSeparadorController implements Controller {
  constructor (
    private readonly separadorRepository: SeparadorRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, cpf } = request.body
      const separador = Separador.create(cpf, nome)
      await this.separadorRepository.save(separador)
      return { statusCode: 200, body: separador.toJson() }
    } catch (error) {
      return badRequest(error.message)
    }
  }
}