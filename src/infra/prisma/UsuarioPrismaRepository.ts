import { UsuarioRepository } from '../../application/repositories/UsuarioRepository';
import { Usuario } from '../../models/Usuario';
import { PrismaHelper } from './PrismaHelper';

export class UsuarioPrismaRepository implements UsuarioRepository {
  async save(usuario: Usuario): Promise<void> {
    const exists = await PrismaHelper.client.usuario.findFirst({ where: { id: usuario.id }})
    if (exists) {
      await PrismaHelper.client.usuario.update({
        where: { id: usuario.id },
        data: {
          login: usuario.login,
          senha: usuario.senha,
          funcao: usuario.funcao,
          separadorId: usuario.separadorId
        }
      })
    } else {
      await PrismaHelper.client.usuario.create({
        data: {
          id: usuario.id,
          login: usuario.login,
          senha: usuario.senha,
          funcao: usuario.funcao,
          separadorId: usuario.separadorId
        }
      })
    }    
  }

  async findById(usuarioId: string): Promise<Usuario> {
    const data = await PrismaHelper.client.usuario.findFirst({ where: { id: usuarioId }})
    return this.toModel(data)
  }

  async get(login: string): Promise<Usuario> {
    const data = await PrismaHelper.client.usuario.findFirst({ where: { login: login }})
    return this.toModel(data)    
  }

  async list(): Promise<Usuario[]> {
    const usuarios = await PrismaHelper.client.usuario.findMany()
    return usuarios.map<Usuario>(usuarioData => this.toModel(usuarioData))
  }

  async delete(usuarioId: any): Promise<void> {
    await PrismaHelper.client.usuario.delete({ where: { id: usuarioId }})    
  }

  private toModel(data): Usuario {
    return new Usuario(data.id, data.login, data.senha, data.funcao, data.separadorId)
  }
}