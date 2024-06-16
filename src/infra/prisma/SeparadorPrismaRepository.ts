import { SeparadorRepository } from '../../application/repositories/SeparadorRepository';
import { Separador } from '../../models/Separador';
import { PrismaHelper } from './PrismaHelper';

export class SeparadorPrismaRepository implements SeparadorRepository {
  async save(separador: Separador): Promise<void> {
    const exists = await PrismaHelper.client.separador.findFirst({where: { id: separador.id }})
    if (exists) {
      await PrismaHelper.client.separador.update({
        data: {
          cpf: separador.cpf,
          nome: separador.nome
        },
        where: { id: separador.id }
      })
    } else {
      await PrismaHelper.client.separador.create({
        data: {
          id: separador.id,
          cpf: separador.cpf,
          nome: separador.nome
        }
      })
    }    
  }

  async list(): Promise<Separador[]> {
    const separadoresData = await PrismaHelper.client.separador.findMany()    
    return separadoresData.map<Separador>(separadorData => this.toModel(separadorData))
  }

  async findById(separadorId: string): Promise<Separador> {
    const separadorData = await PrismaHelper.client.separador.findFirst({where: { id: separadorId }})
    return this.toModel(separadorData)
  }

  async delete(separadorId: string): Promise<void> {
    await PrismaHelper.client.separador.delete({where: { id: separadorId }})
  }

  private toModel(data: any): Separador { 
    return new Separador(data.id, data.cpf, data.nome)
  }
}