import { PedidoRepository } from '../../../application/repositories/PedidoRepository';
import { Produto } from '../../../models/Produto';
import { Controller, HttpRequest, HttpResponse, notFound } from '../../Controller';

export class AtualizarProdutoController implements Controller {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id, produtoId, nome, quantidade } = request.body
    const pedido = await this.pedidoRepository.findById(id)
    const produto = this.getProductById(produtoId, pedido.produtos)
    if (!produto) return notFound(`Produto não encontrado`)
    if (nome) produto.nome = nome
    if (quantidade) produto.quantidade = quantidade
    pedido.updateProduto(produto)
    await this.pedidoRepository.save(pedido)
    return {statusCode: 200, body: pedido.toJson() }
  }

  private getProductById(produtoId: string, produtos: Produto[]): Produto | null {
    for(const produto of produtos) {
      if (produto.id === produtoId) return produto
    }
    return null;
  }
}