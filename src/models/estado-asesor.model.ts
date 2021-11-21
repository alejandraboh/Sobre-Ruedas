import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model({settings: {strict: false}})
export class EstadoAsesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Estado_asesor: boolean;

  @hasMany(() => Asesor)
  EstadoAsesor_Asesor: Asesor[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EstadoAsesor>) {
    super(data);
  }
}

export interface EstadoAsesorRelations {
  // describe navigational properties here
}

export type EstadoAsesorWithRelations = EstadoAsesor & EstadoAsesorRelations;
