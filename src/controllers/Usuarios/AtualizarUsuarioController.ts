import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Controller, HttpRequest, HttpResponse } from '../Controller';

export class AtualizarUsuarioController implements Controller {
  constructor (
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id, senha, funcao, separadorId } = request.body
    const usuario = await this.usuarioRepository.findById(id)
    if (senha) usuario.senha = senha
    if (funcao) usuario.funcao = funcao
    if (separadorId) usuario.separadorId = separadorId
    await this.usuarioRepository.save(usuario)
    return { statusCode: 200, body: usuario.toJson() }
  }
}