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
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },

  computed: {
    $_classes () {
      const classes = ['row']

      if (this.gutter) {
        classes.push(`q-col-gutter-${this.gutter}`)
      }

      return classes
    }
  },

  methods: {
    $_getBreakpoint (columns) {
      const classes = []
      const profiles = { col: 'col', xs: 'col-xs', sm: 'col-sm', md: 'col-md', lg: 'col-lg', xl: 'col-xl' }
      const { fieldProps, classes: renamedClasses, ...formattedColumns } = columns || {}

      for (const key in formattedColumns) {
        const value = formattedColumns[key]
        classes.push(irregularClasses.includes(value) ? value : `${profiles[key]}-${value}`)
      }

      return [...classes, renamedClasses]
    },

    $_getFieldClass (index, isGridGenerator) {
      if (typeof this.columns === 'string') {
        return irregularClasses.includes(this.columns) ? this.columns : `col-${this.columns}`
      }

      return Array.isArray(this.columns)
        ? this.$_handleColumnsByIndex(index, isGridGenerator)
        : this.$_handleColumnsByField(index, isGridGenerator)
    },

    $_handleColumnsByField (index, isGridGenerator) {
      if (!this.columns[index]) {
        return this.$_setDefaultColumnClass(isGridGenerator)
      }

      return this.$_getBreakpoint(this.columns[index])
    },

    $_handleColumnsByIndex (index, isGridGenerator) {
      const fields = isGridGenerator ? this.fields : this.groupedFields.visible

      if (!Array.isArray(fields)) {
        index = Object.keys(fields).findIndex(field => field === index)
      }

      const length = this.columns.length

      if (!length) {
        return this.$_setDefaultColumnClass(isGridGenerator)
      }

      return this.$_getBreakpoint(this.columns[index])
    },

    $_setDefaultColumnClass (isGridGenerator) {
      return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
    }
  }
}
