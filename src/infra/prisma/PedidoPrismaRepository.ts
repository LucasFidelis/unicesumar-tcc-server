import { PedidoRepository } from '../../application/repositories/PedidoRepository';
import { Pedido } from '../../models/Pedido';
import { Produto } from '../../models/Produto';
import { PrismaHelper } from './PrismaHelper';

export class PedidoPrismaRepository implements PedidoRepository {
  async save(pedido: Pedido): Promise<void> {
    const exists = await PrismaHelper.client.pedido.findFirst({ where: { id: pedido.id } })
    if (exists) {
      await PrismaHelper.client.pedido.update({
        where: { id: pedido.id },
        data: {
          nomeCliente: pedido.nomeCliente,
          emissao: pedido.emissao.toISOString(),
          canalVendaId: pedido.canalVendaId
        }
      })
      await PrismaHelper.client.produto.deleteMany({ where: { pedidoId: pedido.id }})
      for (const produto of pedido.produtos) {
        await this.createOrUpdateProduto(pedido.id, produto)
      }
    } else {
      await PrismaHelper.client.pedido.create({
        data: {
          id: pedido.id,
          identificadorLoja: pedido.identificadorLoja,
          nomeCliente: pedido.nomeCliente,
          emissao: pedido.emissao.toISOString(),
          canalVendaId: pedido.canalVendaId
        }
      })
      for (const produto of pedido.produtos) {
        await PrismaHelper.client.produto.create({
          data: {
            id: produto.id,
            nome: produto.nome,
            quantidade: produto.quantidade,
            pedidoId: pedido.id
          }
        })
      }
    }
  }

  private async createOrUpdateProduto(pedidoId: string, produto: Produto): Promise<void> {
    const exists = await PrismaHelper.client.produto.findFirst({ 
      where: { 
        id: produto.id,
        pedidoId: pedidoId
      }
    })
    if (exists) {
      await PrismaHelper.client.produto.update({ 
        where: { 
          id: produto.id,
          pedidoId: pedidoId
        },
        data: {
          nome: produto.nome,
          quantidade: produto.quantidade
        }
      })
    } else {
      await PrismaHelper.client.produto.create({ 
        data: {
          id: produto.id,
          nome: produto.nome,
          quantidade: produto.quantidade,
          pedidoId: pedidoId
        }
      })
    }
  }

  async findById(pedidoId: string): Promise<Pedido> {
    const pedidoData = await PrismaHelper.client.pedido.findFirst({
      where: { id: pedidoId },
      include: { produtos: true },
    })
    return this.toModel(pedidoData)
  }

  async delete(pedidoId: string): Promise<void> {
    await PrismaHelper.client.pedido.delete({ where: { id: pedidoId } })
  }

  async list(): Promise<Pedido[]> {
    const pedidosData = await PrismaHelper.client.pedido.findMany({
      include: { produtos: true }
    })
    return pedidosData.map<Pedido>(pedidoData => this.toModel(pedidoData))
  }

  async findByCanalVendaId(canalVendaId: string): Promise<Pedido[]> {
    const pedidosData = await PrismaHelper.client.pedido.findMany({
      where: { canalVendaId: canalVendaId },
      include: { produtos: true }
    })
    if (pedidosData.length == 0) return null
    return pedidosData.map<Pedido>(pedidoData => this.toModel(pedidoData))
  }

  private toModel(data: any): Pedido {
    const emissao = new Date(data.emissao)
    const pedido = new Pedido(data.id, data.identificadorLoja, data.nomeCliente, emissao, data.canalVendaId)
    for (const produtoData of data.produtos) {
      const produto = new Produto(produtoData.id, produtoData.nome, produtoData.quantidade)
      pedido.addProduto(produto)
    }
    return pedido
  }
}