import { Router } from 'express';
import { RouterAdapter } from './RouterAdapter';
import { UsuarioRepository } from '../application/repositories/UsuarioRepository';
import { UsuarioPrismaRepository } from '../infra/prisma/UsuarioPrismaRepository';
import { CriarUsuarioController } from '../controllers/Usuarios/CriarUsuarioController';
import { AtualizarUsuarioController } from '../controllers/Usuarios/AtualizarUsuarioController';
import { ListUsuariosController } from '../controllers/Usuarios/ListUsuariosController';
import { DeletarUsuarioController } from '../controllers/Usuarios/DeletarUsuarioController';

export const makeUsuarioRoutes = (router: Router) => {
  router.post('/usuarios', RouterAdapter(makeCriarUsuarioController()))
  router.post('/usuarios/:id', RouterAdapter(makeAtualizarUsuarioController()))
  router.get('/usuarios', RouterAdapter(makeListUsuariosController()))
  router.delete('/usuarios/:id', RouterAdapter(makeDeletarUsuarioController()))
}

const makeUsuarioRepository = (): UsuarioRepository => {
  return new UsuarioPrismaRepository()
}

const makeCriarUsuarioController = (): CriarUsuarioController => {
  return new CriarUsuarioController(makeUsuarioRepository())
}

const makeAtualizarUsuarioController = (): AtualizarUsuarioController => {
  return new AtualizarUsuarioController(makeUsuarioRepository())
}

const makeListUsuariosController = (): ListUsuariosController => {
  return new ListUsuariosController(makeUsuarioRepository())
}

const makeDeletarUsuarioController = (): DeletarUsuarioController => {
  return new DeletarUsuarioController(makeUsuarioRepository())
}