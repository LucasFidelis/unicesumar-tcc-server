import { CanalVenda } from '../../models/CanalVenda';

export interface CanalVendaRepository {
  save (canalVenda: CanalVenda): Promise<void>
  list(): Promise<CanalVenda[]>
  delete(canalVendaId: string): Promise<void>
  findById(canalVendaId: string): Promise<CanalVenda>
}