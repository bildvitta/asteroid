<template>
  <qas-box class="q-px-lg q-py-md">
    <q-table ref="table" class="bg-white qas-table-generator text-grey-8" :class="tableClass" v-bind="attributes">
      <template v-for="(_, name) in $slots" #[name]="context">
        <slot :name="name" :props="context" />
      </template>

      <template v-for="(_, fieldName) in fields" :key="fieldName" #[`body-cell-${fieldName}`]="context">
        <q-td>
          <component :is="contentComponent" v-bind="contentBind(context.row)">
            <slot :name="`body-cell-${fieldName}`" v-bind="context || {}">
              {{ context.row?.[fieldName] }}
            </slot>
          </component>
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

    rowRouteFn: {
      type: Function,
      default: undefined
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
    },

    useExternalLink: {
      type: Boolean
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
    contentComponent () {
      if (this.useExternalLink) return 'a'

      return this.rowRouteFn ? 'router-link' : 'span'
    },

    attributes () {
      const attributes = {
        columns: this.columnsByFields,
        rows: this.resultsByFields,
        flat: true,
        hideBottom: true,
        pagination: { rowsPerPage: 0 },
        rowKey: this.rowKey,

        // Eventos.
        onRowClick: this.$attrs.onRowClick && this.onRowClick
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
          headerClasses: 'text-grey-9'
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
    },

    contentBind (row) {
      if (!this.rowRouteFn) return

      return {
        class: 'text-no-decoration text-grey-8 flex full-width items-center full-height',
        [this.useExternalLink ? 'href' : 'to']: this.rowRouteFn(row),
        onClick: event => {
          if (this.hasScrollOnGrab && this.scrollOnGrab.haveMoved()) return event.preventDefault()
        }
      }
    },

    onRowClick () {
      if (this.hasScrollOnGrab && this.scrollOnGrab.haveMoved()) return
      this.$attrs.onRowClick(...arguments)
    }
  }
}
</script>

<style lang="scss">
.qas-table-generator {
  .q-table {
    th {
      @include set-typography($subtitle1);
    }

    td,
    th,
    thead,
    tr {
      border-color: $grey-4;
    }

    td {
      @include set-typography($body1);
    }

    tr {
      transition: background-color var(--qas-generic-transition);

      &:hover {
        background-color: $grey-2;
      }
    }

    thead tr:hover {
      background-color: white;
    }
  }

  &--mobile {
    margin: 0 -10px;

    .q-table {
      margin-left: 10px;
    }
  }
}
</style>
