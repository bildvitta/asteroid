const irregularClasses = ['col', 'col-auto', 'fit']

export default {
  props: {
    columns: {
      default: () => [],
      type: [Array, String, Object]
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    gutter: {
      default: 'md',
      type: [String, Boolean],
      validator: value => {
        return typeof value === 'boolean' || ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
      }
    }
  },

  computed: {
    mx_classes () {
      const classes = ['row']

      if (this.gutter) {
        classes.push(`q-col-gutter-${this.gutter}`)
      }

      return classes
    }
  },

  methods: {
    mx_getBreakpoint (columns) {
      const classes = []
      const profiles = { col: 'col', xs: 'col-xs', sm: 'col-sm', md: 'col-md', lg: 'col-lg', xl: 'col-xl' }
      const { fieldProps, classes: renamedClasses, ...formattedColumns } = columns || {}

      for (const key in formattedColumns) {
        const value = formattedColumns[key]
        classes.push(irregularClasses.includes(value) ? value : `${profiles[key]}-${value}`)
      }

      return [...classes, renamedClasses]
    },

    mx_getFieldClass (index, isGridGenerator) {
      if (typeof this.columns === 'string') {
        return irregularClasses.includes(this.columns) ? this.columns : `col-${this.columns}`
      }

      return Array.isArray(this.columns)
        ? this.mx_handleColumnsByIndex(index, isGridGenerator)
        : this.mx_handleColumnsByField(index, isGridGenerator)
    },

    mx_handleColumnsByField (index, isGridGenerator) {
      if (!this.columns[index]) {
        return this.mx_setDefaultColumnClass(isGridGenerator)
      }

      return this.mx_getBreakpoint(this.columns[index])
    },

    mx_handleColumnsByIndex (index, isGridGenerator) {
      const fields = isGridGenerator ? this.fields : {}

      if (!isGridGenerator) {
        for (const key in this.normalizedFields) {
          Object.assign(fields, this.normalizedFields[key].fields.visible)
        }
      }

      if (!Array.isArray(fields)) {
        index = Object.keys(fields).findIndex(field => field === index)
      }

      const length = this.columns.length

      if (!length) {
        return this.mx_setDefaultColumnClass(isGridGenerator)
      }

      return this.mx_getBreakpoint(this.columns[index])
    },

    mx_setDefaultColumnClass (isGridGenerator) {
      return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
    }
  }
}
