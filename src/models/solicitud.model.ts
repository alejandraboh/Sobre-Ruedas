import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  Url_Cotizacion: string;

  @belongsTo(() => Asesor, {name: 'Asesor_Solicitud'})
  asesorId: string;

  @belongsTo(() => Cliente, {name: 'Cliente_Solicitud'})
  clienteId: string;

  @hasMany(() => EstadoSolicitud)
  Solicitud_EstadoSol: EstadoSolicitud[];

  @belongsTo(() => Vehiculo, {name: 'Vehiculo_Solicitud'})
  vehiculoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
