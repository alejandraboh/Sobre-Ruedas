import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ConcesionarioParametros extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Correo_Contacto: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ConcesionarioParametros>) {
    super(data);
  }
}

export interface ConcesionarioParametrosRelations {
  // describe navigational properties here
}

export type ConcesionarioParametrosWithRelations = ConcesionarioParametros & ConcesionarioParametrosRelations;
