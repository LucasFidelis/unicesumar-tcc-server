import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Controller, HttpRequest, HttpResponse, badRequest } from '../Controller';

export class UpdateSeparadorController implements Controller {
  constructor(
    private readonly separadorRepository: SeparadorRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, cpf, nome } = request.body
      const separador = await this.separadorRepository.findById(id)
      if (cpf) separador.cpf = cpf
      if (nome) separador.nome = nome
      await this.separadorRepository.save(separador)
      return { statusCode: 200, body: separador.toJson() }
    } catch (error) {
      return badRequest(error.message)
    }
  }
}