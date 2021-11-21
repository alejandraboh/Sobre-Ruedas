import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {InvitacionAsesor, InvitacionAsesorRelations, Administrador, Asesor} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class InvitacionAsesorRepository extends DefaultCrudRepository<
  InvitacionAsesor,
  typeof InvitacionAsesor.prototype.id,
  InvitacionAsesorRelations
> {

  public readonly Administrador_Invitacion: BelongsToAccessor<Administrador, typeof InvitacionAsesor.prototype.id>;

  public readonly Asesor_Invitacion: BelongsToAccessor<Asesor, typeof InvitacionAsesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(InvitacionAsesor, dataSource);
    this.Asesor_Invitacion = this.createBelongsToAccessorFor('Asesor_Invitacion', asesorRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Invitacion', this.Asesor_Invitacion.inclusionResolver);
    this.Administrador_Invitacion = this.createBelongsToAccessorFor('Administrador_Invitacion', administradorRepositoryGetter,);
    this.registerInclusionResolver('Administrador_Invitacion', this.Administrador_Invitacion.inclusionResolver);
  }
}
