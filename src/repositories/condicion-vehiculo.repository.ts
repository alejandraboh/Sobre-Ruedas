import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CondicionVehiculo, CondicionVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CondicionVehiculoRepository extends DefaultCrudRepository<
  CondicionVehiculo,
  typeof CondicionVehiculo.prototype.id,
  CondicionVehiculoRelations
> {

  public readonly Vehiculo_CondicionVeh: HasManyRepositoryFactory<Vehiculo, typeof CondicionVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CondicionVehiculo, dataSource);
    this.Vehiculo_CondicionVeh = this.createHasManyRepositoryFactoryFor('Vehiculo_CondicionVeh', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('Vehiculo_CondicionVeh', this.Vehiculo_CondicionVeh.inclusionResolver);
  }
}
