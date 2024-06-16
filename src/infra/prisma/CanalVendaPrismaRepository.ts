import { CanalVendaRepository } from '../../application/repositories/CanalVendaRepository';
import { CanalVenda } from '../../models/CanalVenda';
import { PrismaHelper } from './PrismaHelper';

export class CanalVendaPrismaRepository implements CanalVendaRepository {
  async save(canalVenda: CanalVenda): Promise<void> {
    const exists = await PrismaHelper.client.canalVenda.findFirst({ where: { id: canalVenda.id } })
    if (exists) {
      await PrismaHelper.client.canalVenda.update({
        data: {
          nome: canalVenda.nome,
          prioridade: canalVenda.prioridade
        },
        where: { id: canalVenda.id }
      })
    } else {
      await PrismaHelper.client.canalVenda.create({
        data: {
          id: canalVenda.id,
          nome: canalVenda.nome,
          prioridade: canalVenda.prioridade
        }
      })
    }
  }

  async list(): Promise<CanalVenda[]> {
    const data = await PrismaHelper.client.canalVenda.findMany()
    return data.map<CanalVenda>(canalVendaData => this.toModel(canalVendaData))
  }

  async delete(canalVendaId: string): Promise<void> {
    await PrismaHelper.client.canalVenda.delete({ where: { id: canalVendaId } })
  }

  async findById(canalVendaId: string): Promise<CanalVenda> {
    const data = await PrismaHelper.client.canalVenda.findFirst({ where: { id: canalVendaId } })
    return this.toModel(data)
  }

  private toModel(data: any): CanalVenda {
    return new CanalVenda(data.id, data.nome, data.prioridade)
  }
}