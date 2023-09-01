import { fields, schema } from '../schemas/chart'
import { date } from 'quasar'

export default {
  name: 'charts_multiple_results',

  fields,

  schema,

  filters: {
    fields: {
      date: {
        name: 'date',
        type: 'date',
        label: 'Dia',
        useIso: true
      }
    },

    queryOperators: {
      date: value => {
        const formattedDate = date.formatDate(value, 'DD/MM/YYYY')

        return {
          value: formattedDate,
          operator: '$eq',
          model: 'label'
        }
      }
    }
  }
}
