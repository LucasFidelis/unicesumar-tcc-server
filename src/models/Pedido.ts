import { Produto } from './Produto'
import { UUIDGenerator } from './UUIDGenerator'

type CreatePedidoProps = {
  identificadorLoja: string
  nomeCliente: string
  emissao: Date
  canalVendaId: string
}

export class Pedido {
  private _nomeCliente: string
  private _emissao: Date
  private _produtos: Produto[] = []

  constructor (
    public readonly id: string,
    public readonly identificadorLoja: string,
    nomeCliente: string,
    emissao: Date,
    public canalVendaId: string
  ) {
    this.nomeCliente = nomeCliente
    this.emissao = emissao
  }

  static create(props: CreatePedidoProps): Pedido {
    const id = UUIDGenerator.create()
    return new Pedido(
      id,
      props.identificadorLoja,
      props.nomeCliente,
      props.emissao,
      props.canalVendaId
    )
  }

  public get nomeCliente(): string {
    return this._nomeCliente
  }

  public set nomeCliente(value: string) {
    this._nomeCliente = value
  }

  public get emissao(): Date {
    return this._emissao
  }

  public set emissao(value: Date) {
    this._emissao = value
  }

  public addProduto(produto: Produto) {
    this._produtos.push(produto)
  }

  public removeProdutos() {
    this._produtos = []
  }

  public removeProduto(produtoId: string) {
    this._produtos = this._produtos.filter(produto => produto.id != produtoId)
  }

  public updateProduto(produto: Produto) {
    this._produtos.filter(produtoData => produtoData.id == produto.id)[0] = produto
  }

  public get produtos(): Produto[] {
    return this._produtos
  }

  public toJson(): object {
    return {
      id: this.id,
      identificadorLoja: this.identificadorLoja,
      nomeCliente: this.nomeCliente,
      emissao: this._emissao.toISOString(),
      canalVendaId: this.canalVendaId,
      produtos: this._produtos.map(produto => produto.toJson())
    }
  }
}