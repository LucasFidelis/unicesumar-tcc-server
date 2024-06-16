import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class ListUsuariosController implements Controller {
  constructor (
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usuarios = await this.usuarioRepository.list()
    const output = usuarios.map(usuario => usuario.toJson())
    return { statusCode: 200, body: output }
  }
}