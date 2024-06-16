import { UUIDGenerator } from './UUIDGenerator';
import { Encrypter } from './Encrypter'

export class Usuario {
  private _senha: string
  private _funcao: string
  private _separadorId: string

  constructor (
    public readonly id: string,
    public readonly login: string,
    senha: string,
    funcao: string,
    separadorId?: string
  ) {
    this._senha = senha
    this.funcao = funcao
    this.separadorId = separadorId
  }

  static create(login: string, senha: string, funcao: string, separadorId?: string) {
    const id = UUIDGenerator.create()
    senha = Encrypter.encrypt(senha)
    const usuario = new Usuario(id, login, senha, funcao, separadorId)
    return usuario
  }

  public get senha(): string {
    return this._senha
  }

  public set senha(value: string) {
    this._senha = Encrypter.encrypt(value)
  }

  public get funcao(): string {
    return this._funcao
  }

  public set funcao(value: string) {
    this._funcao = value
  }

  public get separadorId(): string {
    return this._separadorId
  }

  public set separadorId(value: string) {
    if (value) {
      this.funcao = 'separador'
      this._separadorId = value
    }
  }

  public toJson(): object { 
    return {
      id: this.id,
      login: this.login,
      funcao: this.funcao,
      separadorId: this.separadorId
    }
  }
}