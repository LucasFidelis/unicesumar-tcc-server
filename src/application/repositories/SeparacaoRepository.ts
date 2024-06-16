import { Separacao } from '../../models/Separacao';

export interface SeparacaoRepository {
  save(separacao: Separacao): Promise<void>
  list(): Promise<Separacao[]>
  get(separacaoId: string): Promise<Separacao>
  delete(separacao: Separacao): Promise<void>
  findByPedido(pedidoId: string): Promise<Separacao>
  findBySeparador(separadorId: string): Promise<Separacao[]>
}