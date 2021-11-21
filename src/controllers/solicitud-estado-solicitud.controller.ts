import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  EstadoSolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudEstadoSolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/estado-solicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many EstadoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EstadoSolicitud>,
  ): Promise<EstadoSolicitud[]> {
    return this.solicitudRepository.Solicitud_EstadoSol(id).find(filter);
  }

  @post('/solicituds/{id}/estado-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {
            title: 'NewEstadoSolicitudInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) estadoSolicitud: Omit<EstadoSolicitud, 'id'>,
  ): Promise<EstadoSolicitud> {
    return this.solicitudRepository.Solicitud_EstadoSol(id).create(estadoSolicitud);
  }

  @patch('/solicituds/{id}/estado-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.EstadoSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: Partial<EstadoSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EstadoSolicitud)) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.Solicitud_EstadoSol(id).patch(estadoSolicitud, where);
  }

  @del('/solicituds/{id}/estado-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.EstadoSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EstadoSolicitud)) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.Solicitud_EstadoSol(id).delete(where);
  }
}
