import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class DeletarUsuarioController implements Controller {
  constructor (
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.body
    await this.usuarioRepository.delete(id)
    return { statusCode: 200 }
  }
}