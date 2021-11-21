import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadoSolicitud,
  Solicitud,
} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

export class EstadoSolicitudSolicitudController {
  constructor(
    @repository(EstadoSolicitudRepository)
    public estadoSolicitudRepository: EstadoSolicitudRepository,
  ) { }

  @get('/estado-solicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to EstadoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof EstadoSolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.estadoSolicitudRepository.Solicitud_EstadoSol(id);
  }
}
