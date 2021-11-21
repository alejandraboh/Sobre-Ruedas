import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadoAsesor, EstadoAsesorRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class EstadoAsesorRepository extends DefaultCrudRepository<
  EstadoAsesor,
  typeof EstadoAsesor.prototype.id,
  EstadoAsesorRelations
> {

  public readonly EstadoAsesor_Asesor: HasManyRepositoryFactory<Asesor, typeof EstadoAsesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(EstadoAsesor, dataSource);
    this.EstadoAsesor_Asesor = this.createHasManyRepositoryFactoryFor('EstadoAsesor_Asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('EstadoAsesor_Asesor', this.EstadoAsesor_Asesor.inclusionResolver);
  }
}
