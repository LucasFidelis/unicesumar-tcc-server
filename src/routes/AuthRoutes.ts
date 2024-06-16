import { Router } from 'express';
import { RouterAdapter } from './RouterAdapter';
import { UsuarioRepository } from '../application/repositories/UsuarioRepository';
import { UsuarioPrismaRepository } from '../infra/prisma/UsuarioPrismaRepository';
import { LoginController } from '../controllers/Usuarios/LoginController';

export const makeAuthRoutes = (router: Router) => {
  router.post('/auth', RouterAdapter(makeLoginController()))
}

const makeUsuarioRepository = (): UsuarioRepository => {
  return new UsuarioPrismaRepository()
}

const makeLoginController = (): LoginController => {
  return new LoginController(makeUsuarioRepository())
}

