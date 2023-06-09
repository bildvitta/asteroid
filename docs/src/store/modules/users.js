import { createUUID, createDateTime } from '@bildvitta/vuex-offline'
import { fields, schema } from '../schemas/user'

export default {
  name: 'users',

  fields,

  schema,

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
