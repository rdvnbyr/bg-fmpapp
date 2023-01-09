import {Entity, model, property} from '@loopback/repository';

interface Permission {
  write: boolean;
  read: boolean;
  delete: boolean;
}

interface Members {
  id: string;
  permission: Permission[];
}

@model({settings: {strict: false}})
export class Workspace extends Entity {
  // Define well-known properties here

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    required: true,
  })
  members: Members[];

  @property({
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Workspace>) {
    super(data);
  }
}

export interface WorkspaceRelations {
  // describe navigational properties here
}

export type WorkspaceWithRelations = Workspace & WorkspaceRelations;
