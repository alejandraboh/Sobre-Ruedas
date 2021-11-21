import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model({settings: {strict: false}})
export class InvitacionAsesor extends Entity {
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
  Hash: string;

  @belongsTo(() => Administrador, {name: 'Administrador_Invitacion'})
  administradorId: string;

  @belongsTo(() => Asesor, {name: 'Asesor_Invitacion'})
  asesorId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InvitacionAsesor>) {
    super(data);
  }
}

export interface InvitacionAsesorRelations {
  // describe navigational properties here
}

export type InvitacionAsesorWithRelations = InvitacionAsesor & InvitacionAsesorRelations;
