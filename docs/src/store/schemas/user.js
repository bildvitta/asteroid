export const fields = {
  isActive: {
    name: 'isActive',
    label: 'Usuário ativo?',
    type: 'boolean',
    default: false
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

export const schema = {
  title: 'User schema',
  version: 0,
  type: 'object',
  primaryKey: 'uuid',
  properties: {
    uuid: {
      type: 'string'
    },

    isActive: {
      type: 'boolean',
      default: false
    },

    company: {
      type: 'string'
    },

    name: {
      type: 'string',
      minLength: 1
    },

    document: {
      type: 'string',
      minLength: 1
    },

    email: {
      type: 'string',
      minLength: 1
    },

    phone: {
      type: 'string',
      minLength: 1
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
}
