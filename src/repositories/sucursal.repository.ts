import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Vehiculo, Ciudad} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {CiudadRepository} from './ciudad.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.id,
  SucursalRelations
> {

  public readonly Vehiculo_Sucursal: HasManyRepositoryFactory<Vehiculo, typeof Sucursal.prototype.id>;

  public readonly Sucursal_Ciudad: BelongsToAccessor<Ciudad, typeof Sucursal.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Sucursal, dataSource);
    this.Sucursal_Ciudad = this.createBelongsToAccessorFor('Sucursal_Ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('Sucursal_Ciudad', this.Sucursal_Ciudad.inclusionResolver);
    this.Vehiculo_Sucursal = this.createHasManyRepositoryFactoryFor('Vehiculo_Sucursal', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_Sucursal', this.Vehiculo_Sucursal.inclusionResolver);
  }
}
