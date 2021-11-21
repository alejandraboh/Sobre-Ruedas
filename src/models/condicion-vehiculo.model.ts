import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class CondicionVehiculo extends Entity {
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
  condicion_vehiculo: string;

  @hasMany(() => Vehiculo)
  Vehiculo_CondicionVeh: Vehiculo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CondicionVehiculo>) {
    super(data);
  }
}

export interface CondicionVehiculoRelations {
  // describe navigational properties here
}

export type CondicionVehiculoWithRelations = CondicionVehiculo & CondicionVehiculoRelations;
