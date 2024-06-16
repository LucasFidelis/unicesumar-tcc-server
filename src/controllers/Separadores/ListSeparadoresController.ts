import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Separador } from '../../models/Separador';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class ListSeparadoresController implements Controller {
  constructor (
    private readonly separadorRepository: SeparadorRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const separadores = await this.separadorRepository.list()
    const output = separadores.map(separador => separador.toJson())
    return { statusCode: 200, body: output }
  }
}