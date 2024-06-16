import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Separador } from '../../models/Separador';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class GetSeparadorController implements Controller {
  constructor (
    private readonly separadorRepository: SeparadorRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    const separador = await this.separadorRepository.findById(id)
    return { statusCode: 200, body: separador.toJson() }
  }
}