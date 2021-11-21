import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TipoVehiculo, TipoVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class TipoVehiculoRepository extends DefaultCrudRepository<
  TipoVehiculo,
  typeof TipoVehiculo.prototype.id,
  TipoVehiculoRelations
> {

  public readonly Vehiculo_TipoVeh: HasManyRepositoryFactory<Vehiculo, typeof TipoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(TipoVehiculo, dataSource);
    this.Vehiculo_TipoVeh = this.createHasManyRepositoryFactoryFor('Vehiculo_TipoVeh', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_TipoVeh', this.Vehiculo_TipoVeh.inclusionResolver);
  }
}
