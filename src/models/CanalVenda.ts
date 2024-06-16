import { UUIDGenerator } from './UUIDGenerator';

export class CanalVenda {
  constructor (
    public readonly id: string,
    private _nome: string,
    private _prioridade: string
  ) {}

  static create(nome: string, prioridade: string) {
    const id = UUIDGenerator.create();
    return new CanalVenda(id, nome, prioridade);
  }

  public get nome (): string {
    return this._nome
  }

  public get prioridade (): string {
    return this._prioridade
  }

  public set nome(value: string) {
    this._nome = value
  }

  public set prioridade(value: string) {
    this._prioridade = value
  }

  public toJson(): object {
    return {
      id: this.id,
      nome: this._nome,
      prioridade: this._prioridade
    }
  }
}