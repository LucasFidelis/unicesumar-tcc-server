import { SeparacaoRepository } from '../../application/repositories/SeparacaoRepository';
import { Separacao } from '../../models/Separacao';
import { PrismaHelper } from './PrismaHelper';

export class SeparacaoPrismaRepository implements SeparacaoRepository {

  async save(separacao: Separacao): Promise<void> {
    const exists = await PrismaHelper.client.separacao.findFirst({ where: { id: separacao.id } })
    if (exists) {
      await PrismaHelper.client.separacao.update({
        where: { id: separacao.id },
        data: {
          status: separacao.status
        }
      })
    } else {
      await PrismaHelper.client.separacao.create({
        data: {
          id: separacao.id,
          pedidoId: separacao.pedidoId,
          separadorId: separacao.separadorId,
          status: separacao.status
        }
      })
    }
  }

  async list(): Promise<Separacao[]> {
    const separacoes = await PrismaHelper.client.separacao.findMany()
    return separacoes.map(separacao => this.toModel(separacao))
  }

  async get(separacaoId: string): Promise<Separacao> {
    const data = await PrismaHelper.client.separacao.findFirst({ where: { id: separacaoId } })
    return this.toModel(data)
  }

  async delete(separacao: Separacao): Promise<void> {
    await PrismaHelper.client.separacao.delete({ where: { id: separacao.id } })
  }

  async findByPedido(pedidoId: string): Promise<Separacao> {
    const data = await PrismaHelper.client.separacao.findFirst({ where: { pedidoId: pedidoId } })
    if (data) return this.toModel(data)
    return null
  }

  async findBySeparador(separadorId: string): Promise<Separacao[]> {
    const data = await PrismaHelper.client.separacao.findMany({ where: { separadorId: separadorId } })
    if (data) return data.map((separacaoData) => this.toModel(separacaoData))
    return null
  }

  private toModel(data: any): Separacao {
    return new Separacao(data.id, data.pedidoId, data.separadorId, data.status)
  }
}