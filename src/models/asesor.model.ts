import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {InvitacionAsesor} from './invitacion-asesor.model';
import {Vehiculo} from './vehiculo.model';
import {EstadoAsesor} from './estado-asesor.model';
import {Solicitud} from './solicitud.model';

@model()
export class Asesor extends Entity {
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
  Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  Contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_Completo: string;

  @hasMany(() => InvitacionAsesor)
  Asesor_Invitacion: InvitacionAsesor[];

  @hasMany(() => Vehiculo)
  Asesor_Vehiculo: Vehiculo[];

  @belongsTo(() => EstadoAsesor, {name: 'EstadoAsesor_Asesor'})
  estadoAsesorId: string;

  @hasMany(() => Solicitud)
  Asesor_Solicitud: Solicitud[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
