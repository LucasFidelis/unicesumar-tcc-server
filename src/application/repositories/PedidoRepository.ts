import { Pedido } from '../../models/Pedido';

export interface PedidoRepository {
  save(pedido: Pedido): Promise<void>
  findById(pedidoId: string): Promise<Pedido>
  delete(pedidoId: string): Promise<void>
  list(): Promise<Pedido[]>
  findByCanalVendaId(canalVendaId: string): Promise<Pedido[]> | null
}