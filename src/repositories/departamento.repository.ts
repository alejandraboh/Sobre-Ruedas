import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly Departamento_Ciudad: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Departamento, dataSource);
    this.Departamento_Ciudad = this.createHasManyRepositoryFactoryFor('Departamento_Ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('Departamento_Ciudad', this.Departamento_Ciudad.inclusionResolver);
  }
}
