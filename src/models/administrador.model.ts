import {Entity, model, property, hasMany} from '@loopback/repository';
import {InvitacionAsesor} from './invitacion-asesor.model';

@model()
export class Administrador extends Entity {
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
  Administrador_Invitacion: InvitacionAsesor[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
