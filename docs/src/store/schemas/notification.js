export const fields = {
  read: {
    name: 'read',
    label: 'Visualizado',
    type: 'boolean',
    default: false
  },

  title: {
    name: 'title',
    label: 'Titulo',
    type: 'string'
  },

  message: {
    name: 'message',
    label: 'Mensagem',
    type: 'string'
  },

  createdAt: {
    name: 'createdAt',
    label: 'Enviado em',
    type: 'datetime'
  },

  link: {
    name: 'link',
    label: 'Link de redirecionamento',
    type: 'string'
  }
}

export const schema = {
  title: 'Notification schema',
  version: 0,
  type: 'object',
  primaryKey: 'uuid',
  properties: {
    uuid: {
      type: 'string'
    },

    read: {
      type: 'boolean',
      default: false
    },

    title: {
      type: 'string'
    },

    message: {
      type: 'string'
    },

    createdAt: {
      type: 'string'
    },

    link: {
      type: 'string'
    }
  },

  required: [
    'read',
    'title',
    'message',
    'createdAt'
  ],

  indexes: [
    'createdAt'
  ]
}
