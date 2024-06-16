import { CPF } from './Separador/CPF';
import { UUIDGenerator } from './UUIDGenerator';

export class Separador {
  private _cpf: CPF
  private _nome: string

  constructor(
    public readonly id: string,
    cpf: string,
    nome: string
  ) {
    this.cpf = cpf
    this.nome = nome
  }

  static create(cpf: string, nome: string) {
    const id = UUIDGenerator.create()
    return new Separador(id, cpf, nome)
  }

  public get cpf(): string {
    return this._cpf.value
  }

  public set cpf(value: string) {
    const cpf = new CPF(value)
    this._cpf = cpf
  }

  public get nome(): string {
    return this._nome
  }

  public set nome(value: string) {
    this._nome = value
  }

  public toJson(): object {
    return {
      id: this.id,
      cpf: this.cpf,
      nome: this.nome
    }
  }

}