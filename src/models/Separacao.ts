import { UUIDGenerator } from './UUIDGenerator'

export class Separacao {

  private _status: StatusSeparacao

  constructor(
    public readonly id: string,
    public readonly pedidoId: string,
    public readonly separadorId: string,
    status: StatusSeparacao
  ) { 
    this.status = status;
  }

  static create (
    pedidoId: string,
    separadorId: string,
  ) {
    const id = UUIDGenerator.create()
    return new Separacao(id, pedidoId, separadorId, StatusSeparacao.iniciado);
  }

  get status(): string {
    return this._status
  }

  set status(value: string) {
    this._status = value == 'finalizado' ? StatusSeparacao.finalizado : StatusSeparacao.iniciado
  }

  public toJson(): object {
    return {
      id: this.id,
      pedidoId: this.pedidoId,
      separadorId: this.separadorId,
      status: this._status.toString()
    }
  }
}

export enum StatusSeparacao {
  iniciado = "iniciado",
  finalizado = "finalizado",
}