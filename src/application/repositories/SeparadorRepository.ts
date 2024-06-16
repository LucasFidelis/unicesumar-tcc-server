import { Separador } from '../../models/Separador';

export interface SeparadorRepository {
  save(separador: Separador): Promise<void>
  list(): Promise<Separador[]>
  findById(separadorId: string): Promise<Separador>
  delete(separadorId: string): Promise<void>
}