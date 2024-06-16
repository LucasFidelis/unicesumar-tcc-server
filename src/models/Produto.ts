import { UUIDGenerator } from './UUIDGenerator';

export class Produto {
  private _nome: string
  private _quantidade: number

  constructor (
    public readonly id: string,
    nome: string,
    quantidade: number
  ) {
    this.nome = nome
    this.quantidade = quantidade
  }

  public get nome(): string {
    return this._nome
  }

  public set nome(value: string) {
    this._nome = value
  }

  public get quantidade(): number {
    return this._quantidade
  }

  public set quantidade(value: number) {
    this._quantidade = value
  }

  static create(nome: string, quantidade: number): Produto {
    const id = UUIDGenerator.create()
    return new Produto(id, nome, quantidade)
  }

  public toJson(): object {
    return {
      id: this.id,
      nome: this.nome,
      quantidade: this.quantidade
    }
  }
}