import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {

  public readonly Solicitud_EstadoSol: BelongsToAccessor<Solicitud, typeof EstadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(EstadoSolicitud, dataSource);
    this.Solicitud_EstadoSol = this.createBelongsToAccessorFor('Solicitud_EstadoSol', solicitudRepositoryGetter,);
    this.registerInclusionResolver('Solicitud_EstadoSol', this.Solicitud_EstadoSol.inclusionResolver);
  }
}
