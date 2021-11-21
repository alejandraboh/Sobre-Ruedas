import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, Solicitud, CondicionVehiculo, Sucursal, TipoVehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SolicitudRepository} from './solicitud.repository';
import {CondicionVehiculoRepository} from './condicion-vehiculo.repository';
import {SucursalRepository} from './sucursal.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly Asesor_Vehiculo: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.id>;

  public readonly Vehiculo_Solicitud: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly Vehiculo_CondicionVeh: BelongsToAccessor<CondicionVehiculo, typeof Vehiculo.prototype.id>;

  public readonly Vehiculo_Sucursal: BelongsToAccessor<Sucursal, typeof Vehiculo.prototype.id>;

  public readonly Vehiculo_TipoVeh: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('CondicionVehiculoRepository') protected condicionVehiculoRepositoryGetter: Getter<CondicionVehiculoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.Vehiculo_TipoVeh = this.createBelongsToAccessorFor('Vehiculo_TipoVeh', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_TipoVeh', this.Vehiculo_TipoVeh.inclusionResolver);
    this.Vehiculo_Sucursal = this.createBelongsToAccessorFor('Vehiculo_Sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_Sucursal', this.Vehiculo_Sucursal.inclusionResolver);
    this.Vehiculo_CondicionVeh = this.createBelongsToAccessorFor('Vehiculo_CondicionVeh', condicionVehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_CondicionVeh', this.Vehiculo_CondicionVeh.inclusionResolver);
    this.Vehiculo_Solicitud = this.createHasManyRepositoryFactoryFor('Vehiculo_Solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_Solicitud', this.Vehiculo_Solicitud.inclusionResolver);
    this.Asesor_Vehiculo = this.createBelongsToAccessorFor('Asesor_Vehiculo', asesorRepositoryGetter,);
    this.registerInclusionResolver('Asesor_Vehiculo', this.Asesor_Vehiculo.inclusionResolver);
  }
}
