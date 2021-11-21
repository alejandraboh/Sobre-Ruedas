import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Solicitud} from './solicitud.model';
import {CondicionVehiculo} from './condicion-vehiculo.model';
import {Sucursal} from './sucursal.model';
import {TipoVehiculo} from './tipo-vehiculo.model';

@model()
export class Vehiculo extends Entity {
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
  Estado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'number',
    required: true,
  })
  Modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  Referencia: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @property({
    type: 'string',
    required: true,
  })
  Url_foto: string;

  @property({
    type: 'string',
    required: true,
  })
  Url_Youtube: string;

  @belongsTo(() => Asesor, {name: 'Asesor_Vehiculo'})
  asesorId: string;

  @hasMany(() => Solicitud)
  Vehiculo_Solicitud: Solicitud[];

  @belongsTo(() => CondicionVehiculo, {name: 'Vehiculo_CondicionVeh'})
  condicionVehiculoId: string;

  @belongsTo(() => Sucursal, {name: 'Vehiculo_Sucursal'})
  sucursalId: string;

  @belongsTo(() => TipoVehiculo, {name: 'Vehiculo_TipoVeh'})
  tipoVehiculoId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
