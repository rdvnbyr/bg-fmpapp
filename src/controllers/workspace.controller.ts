import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Workspace} from '../models';
import {WorkspaceRepository} from '../repositories';

export class WorkspaceController {
  constructor(
    @repository(WorkspaceRepository)
    public workspaceRepository : WorkspaceRepository,
  ) {}

  @post('/workspaces')
  @response(200, {
    description: 'Workspace model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workspace)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workspace, {
            title: 'NewWorkspace',
            exclude: ['id'],
          }),
        },
      },
    })
    workspace: Omit<Workspace, 'id'>,
  ): Promise<Workspace> {
    return this.workspaceRepository.create(workspace);
  }

  @get('/workspaces/count')
  @response(200, {
    description: 'Workspace model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Workspace) where?: Where<Workspace>,
  ): Promise<Count> {
    return this.workspaceRepository.count(where);
  }

  @get('/workspaces')
  @response(200, {
    description: 'Array of Workspace model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workspace, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workspace) filter?: Filter<Workspace>,
  ): Promise<Workspace[]> {
    return this.workspaceRepository.find(filter);
  }

  @patch('/workspaces')
  @response(200, {
    description: 'Workspace PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workspace, {partial: true}),
        },
      },
    })
    workspace: Workspace,
    @param.where(Workspace) where?: Where<Workspace>,
  ): Promise<Count> {
    return this.workspaceRepository.updateAll(workspace, where);
  }

  @get('/workspaces/{id}')
  @response(200, {
    description: 'Workspace model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workspace, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Workspace, {exclude: 'where'}) filter?: FilterExcludingWhere<Workspace>
  ): Promise<Workspace> {
    return this.workspaceRepository.findById(id, filter);
  }

  @patch('/workspaces/{id}')
  @response(204, {
    description: 'Workspace PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workspace, {partial: true}),
        },
      },
    })
    workspace: Workspace,
  ): Promise<void> {
    await this.workspaceRepository.updateById(id, workspace);
  }

  @put('/workspaces/{id}')
  @response(204, {
    description: 'Workspace PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() workspace: Workspace,
  ): Promise<void> {
    await this.workspaceRepository.replaceById(id, workspace);
  }

  @del('/workspaces/{id}')
  @response(204, {
    description: 'Workspace DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.workspaceRepository.deleteById(id);
  }
}
