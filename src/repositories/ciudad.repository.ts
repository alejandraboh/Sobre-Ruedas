import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Sucursal, Departamento} from '../models';
import {SucursalRepository} from './sucursal.repository';
import {DepartamentoRepository} from './departamento.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly Sucursal_Ciudad: HasManyRepositoryFactory<Sucursal, typeof Ciudad.prototype.id>;

  public readonly Departamento_Ciudad: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.Departamento_Ciudad = this.createBelongsToAccessorFor('Departamento_Ciudad', departamentoRepositoryGetter,);
    this.registerInclusionResolver('Departamento_Ciudad', this.Departamento_Ciudad.inclusionResolver);
    this.Sucursal_Ciudad = this.createHasManyRepositoryFactoryFor('Sucursal_Ciudad', sucursalRepositoryGetter,);
    this.registerInclusionResolver('Sucursal_Ciudad', this.Sucursal_Ciudad.inclusionResolver);
  }
}
