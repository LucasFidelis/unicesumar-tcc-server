import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Usuario } from '../../models/Usuario';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class CriarUsuarioController implements Controller {
  constructor (
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { login, senha, funcao, separadorId } = request.body
    const usuario = Usuario.create(login, senha, funcao, separadorId)
    await this.usuarioRepository.save(usuario)
    return { statusCode: 200, body: usuario.toJson() }
  }
}