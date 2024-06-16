import { Usuario } from '../../models/Usuario';

export interface UsuarioRepository {
  save(usuario: Usuario): Promise<void>
  findById(usuarioId: string): Promise<Usuario>
  get(login: string): Promise<Usuario>
  list(): Promise<Usuario[]>
  delete(usuarioId): Promise<void>
}