import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Asesor, AsesorRelations, InvitacionAsesor, Vehiculo, EstadoAsesor, Solicitud} from '../models';
import {InvitacionAsesorRepository} from './invitacion-asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {EstadoAsesorRepository} from './estado-asesor.repository';
import {SolicitudRepository} from './solicitud.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly Asesor_Invitacion: HasManyRepositoryFactory<InvitacionAsesor, typeof Asesor.prototype.id>;

  public readonly Asesor_Vehiculo: HasManyRepositoryFactory<Vehiculo, typeof Asesor.prototype.id>;

  public readonly EstadoAsesor_Asesor: BelongsToAccessor<EstadoAsesor, typeof Asesor.prototype.id>;

  public readonly Asesor_Solicitud: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('InvitacionAsesorRepository') protected invitacionAsesorRepositoryGetter: Getter<InvitacionAsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('EstadoAsesorRepository') protected estadoAsesorRepositoryGetter: Getter<EstadoAsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Asesor, dataSource);
    this.Asesor_Solicitud = this.createHasManyRepositoryFactoryFor('Asesor_Solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Solicitud', this.Asesor_Solicitud.inclusionResolver);
    this.EstadoAsesor_Asesor = this.createBelongsToAccessorFor('EstadoAsesor_Asesor', estadoAsesorRepositoryGetter,);
    this.registerInclusionResolver('EstadoAsesor_Asesor', this.EstadoAsesor_Asesor.inclusionResolver);
    this.Asesor_Vehiculo = this.createHasManyRepositoryFactoryFor('Asesor_Vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Vehiculo', this.Asesor_Vehiculo.inclusionResolver);
    this.Asesor_Invitacion = this.createHasManyRepositoryFactoryFor('Asesor_Invitacion', invitacionAsesorRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Invitacion', this.Asesor_Invitacion.inclusionResolver);
  }
}
