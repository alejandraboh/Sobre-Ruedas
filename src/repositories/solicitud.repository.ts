import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Asesor, Cliente, EstadoSolicitud, Vehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly Asesor_Solicitud: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  public readonly Cliente_Solicitud: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  public readonly Solicitud_EstadoSol: HasManyRepositoryFactory<EstadoSolicitud, typeof Solicitud.prototype.id>;

  public readonly Vehiculo_Solicitud: BelongsToAccessor<Vehiculo, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.Vehiculo_Solicitud = this.createBelongsToAccessorFor('Vehiculo_Solicitud', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_Solicitud', this.Vehiculo_Solicitud.inclusionResolver);
    this.Solicitud_EstadoSol = this.createHasManyRepositoryFactoryFor('Solicitud_EstadoSol', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('Solicitud_EstadoSol', this.Solicitud_EstadoSol.inclusionResolver);
    this.Cliente_Solicitud = this.createBelongsToAccessorFor('Cliente_Solicitud', clienteRepositoryGetter,);
    this.registerInclusionResolver('Cliente_Solicitud', this.Cliente_Solicitud.inclusionResolver);
    this.Asesor_Solicitud = this.createBelongsToAccessorFor('Asesor_Solicitud', asesorRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Solicitud', this.Asesor_Solicitud.inclusionResolver);
  }
}
