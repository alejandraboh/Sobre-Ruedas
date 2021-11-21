import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Sucursal} from './sucursal.model';
import {Departamento} from './departamento.model';

@model({settings: {strict: false}})
export class Ciudad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @hasMany(() => Sucursal)
  Sucursal_Ciudad: Sucursal[];

  @belongsTo(() => Departamento, {name: 'Departamento_Ciudad'})
  departamentoId: string;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
