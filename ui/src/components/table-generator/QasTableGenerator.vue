<template>
  <qas-box class="q-px-lg q-py-md">
    <q-table ref="table" class="bg-transparent qas-table-generator" :class="tableClass" v-bind="attributes">
      <template v-for="(_, name) in $slots" #[name]="context">
        <slot v-if="hasBodySlot" name="body" :props="context" />

        <q-td v-else :key="name">
          <slot :name="name" v-bind="context || {}" />
        </q-td>
      </template>
    </q-table>
  </qas-box>
</template>

<script>
import { extend } from 'quasar'
import { humanize } from '../../helpers/filters'
import { setScrollOnGrab } from '../../helpers'

export default {
  name: 'QasTableGenerator',

  props: {
    columns: {
      default: () => [],
      type: Array
    },

    fields: {
      default: () => ({}),
      type: [Array, Object]
    },

    results: {
      default: () => [],
      required: true,
      type: Array
    },

    rowKey: {
      default: 'name',
      type: String
    },

    emptyResultText: {
      default: '-',
      type: String
    },

    useScrollOnGrab: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      scrollableElement: null,
      scrollOnGrab: {},
      elementToObserve: null,
      resizeObserver: null
    }
  },

  computed: {
    attributes () {
      const attributes = {
        columns: this.columnsByFields,
        rows: this.resultsByFields,
        flat: true,
        hideBottom: true,
        pagination: { rowsPerPage: 0 },
        rowKey: this.rowKey
      }

      return attributes
    },

    columnsByFields () {
      if (!this.hasFields) {
        return this.columns.filter(column => column instanceof Object)
      }

      const columns = []

      function columnByField (field) {
        const { align, label, name } = field

        columns.push({
          align: align || 'left',
          field: name,
          label,
          name,
          headerClasses: 'text-primary'
        })
      }

      // Automatic columns.
      if (!this.columns.length) {
        for (const index in this.fields) {
          columnByField(this.fields[index])
        }

        this.$qas.logger.group('QasTableGenerator - Automatic columns', [columns])

        return columns
      }

      // Sorting from the column list.
      this.columns.forEach(column => {
        if (column instanceof Object) {
          columnByField(column)
        } else if (this.fields[column]) {
          columnByField(this.fields[column])
        }
      })

      this.$qas.logger.group('QasTableGenerator - columns', [columns])

      return columns
    },

    hasBodySlot () {
      return !!this.$slots.body
    },

    hasTbodySlot () {
      return !!this.$slots.tbody
    },

    hasFields () {
      return Object.keys(this.fields).length
    },

    resultsByFields () {
      if (!Object.keys(this.fields).length) return []

      const results = extend(true, [], this.results)

      const mappedResults = results.map((result, index) => {
        for (const key in result) {
          result.default = this.results[index]
          result[key] = humanize(this.fields[key], result[key]) || this.emptyResultText
        }

        return result
      })

      this.$qas.logger.group('QasTableGenerator - resultsByFields', [mappedResults])

      return mappedResults
    },

    rowsPerPage () {
      return this.results.length
    },

    tableClass () {
      return this.$qas.screen.isSmall && 'qas-table-generator--mobile'
    },

    hasScrollOnGrab () {
      return !!Object.keys(this.scrollOnGrab).length
    }
  },

  mounted () {
    if (!this.useScrollOnGrab) return

    this.setObserver()
    window.addEventListener('resize', this.handleScrollOnGrab)
  },

  onUnmounted () {
    if (!this.hasScrollOnGrab) return

    this.destroyObserver()
    this.scrollOnGrab.destroyEvents()
    window.removeEventListener('resize', this.handleScrollOnGrab)
  },

  methods: {
    initializeScrollOnGrab () {
      if (this.hasScrollOnGrab) return

      const element = this.getTableElementComponent().querySelector('.q-table__middle.scroll')

      this.scrollOnGrab = setScrollOnGrab(element)
    },

    getTableElementComponent () {
      return this.$refs?.table?.$el
    },

    getTableElement () {
      return this.getTableElementComponent()?.querySelector('table')
    },

    getFullTableWidth () {
      const tableElement = this.getTableElement()
      return tableElement?.getBoundingClientRect?.()?.width
    },

    getContainerTableWidth () {
      const containerElement = this.getTableElementComponent()?.querySelector('.q-table__middle')
      return containerElement?.getBoundingClientRect?.()?.width
    },

    handleScrollOnGrab () {
      const fullTableWidth = this.getFullTableWidth()
      const containerTableWidth = this.getContainerTableWidth()
      const hasScrollOnGrab = !!Object.keys(this.scrollOnGrab).length

      if (fullTableWidth > containerTableWidth) {
        this.initializeScrollOnGrab()
      } else if (hasScrollOnGrab) {
        this.scrollOnGrab.destroyEvents()
        this.scrollOnGrab.element.style.cursor = 'auto'
        this.scrollOnGrab = {}
      }
    },

    setObserver () {
      this.elementToObserve = this.getTableElement()
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(() => this.handleScrollOnGrab())
      })

      this.resizeObserver.observe(this.elementToObserve)
    },

    destroyObserver () {
      this.resizeObserver.unobserve(this.elementToObserve)
    }
  }
}
</script>

<style lang="scss">
.qas-table-generator {
  .q-table th {
    font-weight: bold;
  }

  &--mobile {
    margin: 0 -10px;

    .q-table {
      margin-left: 10px;
    }
  }
}
</style>
