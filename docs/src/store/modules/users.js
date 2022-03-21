import { createUUID, createDateTime } from '@bildvitta/vuex-offline'

const fields = {
  isActive: {
    name: 'isActive',
    label: 'Usuário activo?',
    type: 'boolean',
    default: true
  },

  company: {
    name: 'company',
    label: 'Empresa',
    type: 'select',
    options: [
      {
        label: 'Empresa 1',
        value: 'empresa-1'
      },
      {
        label: 'Empresa 2',
        value: 'empresa-2'
      },
      {
        label: 'Empresa 3',
        value: 'empresa-3'
      }
    ]
  },

  name: {
    name: 'name',
    label: 'Nome',
    type: 'string'
  },

  email: {
    name: 'email',
    label: 'Email',
    type: 'email'
  },

  document: {
    name: 'document',
    label: 'Documento',
    type: 'string',
    mask: 'document'
  },

  phone: {
    name: 'phone',
    label: 'Telefone',
    type: 'string',
    mask: 'phone'
  }
}

export default {
  name: 'users',

  fields,

  schema: {
    title: 'User schema',
    version: 0,
    type: 'object',
    primaryKey: 'uuid',
    properties: {
      uuid: {
        type: 'string'
      },

      isActive: {
        type: 'boolean'
      },

      company: {
        type: 'string'
      },

      name: {
        type: 'string'
      },

      document: {
        type: 'string'
      },

      email: {
        type: 'string'
      },

      phone: {
        type: 'string'
      },

      createdAt: {
        type: 'string',
        format: 'date-time'
      },

      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
    },

    required: [
      'isActive',
      'name',
      'company',
      'email',
      'document',
      'phone',
      'createdAt',
      'updatedAt'
    ],

    indexes: [
      'createdAt'
    ]
  },

  filters: {
    fields,

    queryOperators: {
      isActive: '$eq',
      company: '$eq',
      name: '$eq',
      email: '$eq',
      document: '$eq',
      phone: '$eq'
    },

    search: ['name', 'email']
  },

  sort: { createdAt: 'asc' },

  defaults: {
    uuid: createUUID,
    updatedAt: createDateTime,
    createdAt: createDateTime
  },

  updateDefaults: {
    updatedAt: createDateTime
  }
}
