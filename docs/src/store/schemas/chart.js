export const fields = {
  label: {
    name: 'label',
    label: 'Label',
    type: 'text'
  },

  data: {
    name: 'data',
    label: 'Data',
    type: 'nested',
    children: {
      x: {
        name: 'x',
        type: 'text',
        label: 'Eixo x'
      },

      y: {
        name: 'y',
        type: 'number',
        label: 'Eixo y'
      },

      tooltip: {
        name: 'tooltip',
        type: 'text',
        label: 'Tooltip'
      }
    }
  }
}

export const schema = {
  title: 'Chart schema',
  version: 0,
  type: 'object',
  primaryKey: 'label',
  properties: {
    label: {
      type: 'string'
    },

    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          x: {
            type: 'string'
          },

          y: {
            type: 'number'
          },

          tooltip: {
            type: 'string'
          }
        }
      }
    }
  },

  required: [
    'label',
    'data'
  ]
}
