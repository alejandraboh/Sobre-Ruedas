import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  CondicionVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoCondicionVehiculoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/condicion-vehiculo', {
    responses: {
      '200': {
        description: 'CondicionVehiculo belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CondicionVehiculo)},
          },
        },
      },
    },
  })
  async getCondicionVehiculo(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<CondicionVehiculo> {
    return this.vehiculoRepository.Vehiculo_CondicionVeh(id);
  }
}
