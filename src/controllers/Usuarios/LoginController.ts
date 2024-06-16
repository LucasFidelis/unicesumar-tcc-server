import { TokenGenerator } from '../../application/gateways/TokenGenerator';
import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Encrypter } from '../../models/Encrypter';
import { Controller, HttpRequest, HttpResponse, unauthorized } from '../Controller';

export class LoginController implements Controller {
  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { login, senha } = request.body
      const usuario = await this.usuarioRepository.get(login)
      const isValid = await Encrypter.compare(senha, usuario.senha)
      if (isValid) {
        const expiresIn = 86400
        const accessToken = TokenGenerator.generate({
          sub: usuario.id,
          expiresIn
        })
        return {
          statusCode: 200, body: {
            accessToken,
            role: usuario.funcao
          }
        }
      } else {
        return unauthorized('Usuário ou senha incorreta')
      }
    } catch (error: any) {
      return unauthorized('Usuário ou senha incorreta')
    }
  }
}