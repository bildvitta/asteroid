<template>
  <component :is="parentComponent.is">
    <slot name="parent-header">
      <qas-header v-if="hasHeaderProps" v-bind="headerProps" />
    </slot>

    <q-table v-show="hasResults" ref="table" class="bg-white qas-table-generator text-grey-8" v-bind="attributes">
      <template v-for="(_, name) in slots" #[name]="context">
        <slot :name="name" v-bind="context" />
      </template>

      <template v-for="(fieldName, index) in bodyCellNameSlots" :key="index" #[`body-cell-${fieldName}`]="context">
        <q-td>
          <component :is="tdChildComponent" v-bind="getTdChildComponentProps(context.row)">
            <slot :name="`body-cell-${fieldName}`" v-bind="context || {}">
              {{ context.row?.[fieldName] }}
            </slot>
          </component>
        </q-td>
      </template>
    </q-table>

    <qas-empty-result-text v-if="!hasResults" />

    <PvTableGeneratorTd component-name="QasCopy" name="email" :row="{ email: 'text@example.com' }" />
  </component>
</template>

<script>
import PvTableGeneratorTd from './_components/PvTableGeneratorTd.vue'

import { extend } from 'quasar'
import { isEmpty, humanize, setScrollOnGrab, setScrollGradient } from '../../helpers'

export default {
  name: 'QasTableGenerator',

  components: {
    PvTableGeneratorTd
  },

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

    headerProps: {
      default: () => ({}),
      type: Object
    },

    maxHeight: {
      type: String,
      default: '528px'
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

    useBox: {
      type: Boolean,
      default: true
    },

    useScrollOnGrab: {
      type: Boolean,
      default: true
    },

    useExternalLink: {
      type: Boolean
    },

    useStickyHeader: {
      type: Boolean
    },

    useVirtualScroll: {
      type: Boolean
    }
  },

  data () {
    return {
      scrollableElement: null,
      scrollOnGrab: {},
      elementToObserve: null,
      resizeObserver: null,
      scrollGradientX: setScrollGradient({ orientation: 'x' })
    }
  },

  computed: {
    tdChildComponent () {
      if (this.useExternalLink) return 'a'

      return this.rowRouteFn ? 'router-link' : 'span'
    },

    bodyCellNameSlots () {
      if (this.hasBodyCellSlot) return []

      return this.columns.length
        ? this.columns.map(column => typeof column === 'object' ? column.name : column)
        : Object.keys(this.fields)
    },

    slots () {
      const slots = {}

      for (const slotKey in this.$slots) {
        if (slotKey.includes('body-cell-')) continue

        slots[slotKey] = this.$slots[slotKey]
      }

      return slots
    },

    hasBodyCellSlot () {
      return !!this.$slots['body-cell']
    },

    hasResults () {
      return !!this.resultsByFields.length
    },

    attributes () {
      const attributes = {
        tableClass: {
          'overflow-hidden-y': !this.useStickyHeader && !this.useVirtualScroll
        },
        class: this.tableClass,
        columns: this.columnsByFields,
        flat: true,
        hideBottom: true,
        pagination: { rowsPerPage: 0 },
        rowKey: this.rowKey,
        rows: this.resultsByFields,
        style: this.tableStyle,
        virtualScroll: this.useVirtualScroll,

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
          headerClasses: 'text-grey-10'
        })
      }

      // Automatic columns.
      if (!this.columns.length) {
        for (const index in this.fields) {
          columnByField(this.fields[index])
        }

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

      return columns
    },

    hasFields () {
      return Object.keys(this.fields).length
    },

    resultsByFields () {
      if (!Object.keys(this.fields).length) return []

      const results = extend(true, [], this.results)

      const mappedResults = results.map((result, index) => {
        for (const key in result) {
          const humanizedResult = humanize(this.fields[key], result[key])
          const formattedResult = isEmpty({ value: humanizedResult }) ? this.emptyResultText : humanizedResult

          result.default = this.results[index]
          result[key] = formattedResult
        }

        return result
      })

      return mappedResults
    },

    rowsPerPage () {
      return this.results.length
    },

    tableClass () {
      return {
        'qas-table-generator--mobile': this.$qas.screen.isSmall,
        'qas-table-generator--sticky-header': this.useStickyHeader
      }
    },

    tableStyle () {
      return {
        ...((this.useStickyHeader || this.useVirtualScroll) && { maxHeight: this.maxHeight })
      }
    },

    hasScrollOnGrab () {
      return !!Object.keys(this.scrollOnGrab).length
    },

    parentComponent () {
      return {
        is: this.useBox ? 'qas-box' : 'div'
        // is: this.useBox ? 'qas-box' : 'div'
      }
    },

    hasHeaderProps () {
      return !!Object.keys(this.headerProps).length
    },

    hasAutoScrollY () {
      return this.useStickyHeader || this.useVirtualScroll
    }
  },

  mounted () {
    if (!this.hasAutoScrollY) {
      // const scrollElement = this.getScrollElement()

      // this.scrollGradientX.initializeScrollGradient(scrollElement)
    }

    if (!this.useScrollOnGrab) return

    this.setObserver()
    window.addEventListener('resize', this.handleScrollOnGrab)
  },

  onUnmounted () {
    if (!this.hasAutoScrollY) {
      const scrollElement = this.getScrollElement()

      this.scrollGradientX.removeScrollGradient(scrollElement)
    }

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

    getScrollElement () {
      return this.getTableElementComponent().querySelector('.q-table__middle.scroll')
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

    getTdChildComponentProps (row) {
      if (!this.rowRouteFn) return

      return {
        class: 'text-no-decoration text-grey-8 flex full-width items-center full-height',
        [this.useExternalLink ? 'href' : 'to']: this.rowRouteFn(row),
        ...(this.useExternalLink && { target: '_blank' })
      }
    },

    onRowClick () {
      this.$attrs.onRowClick(...arguments)
    }
  }
}
</script>

<style lang="scss">
.qas-table-generator {
  .q-table {
    thead tr {
      height: 24px;
      position: unset !important;
    }

    th {
      @include set-typography($subtitle1);

      border: 0 !important;
      padding: 0 calc(var(--qas-spacing-lg) / 2);
    }

    td,
    th,
    thead,
    tr {
      border-color: $grey-4;
    }

    td {
      @include set-typography($body1);

      height: 40px;
      padding-left: 0;
      padding-right: 0;
      // padding-left: calc(var(--qas-spacing-lg) / 2);
      // padding-right: calc(var(--qas-spacing-lg) / 2);
      padding-top: var(--qas-spacing-sm);
      padding-bottom: var(--qas-spacing-sm);

      &:before {
        transition: background-color var(--qas-generic-transition);
      }
    }

    &__middle {
      margin-left: -16px;
      padding-left: 16px;
      margin-right: -16px;
      // padding-right: 16px;
      // box-shadow: 0 4px 8px var(--q-accent);
      // padding: 16px;
    }

    tr {
      transition: background-image var(--qas-generic-transition);
      position: relative;

      &::before {
        position: absolute;
        content: '';
        top: 0;
        left: -16px;
        right: -16px;
        bottom: 0;
        background-color: transparent;
        // width: 100%;

      }

      &:hover:not(:has(td *[data-ignore-hover]:hover)) {
        td:not(:has(*[data-ignore-hover])) * {
          // color: var(--q-primary-contrast) !important;
        }

        // background-image: linear-gradient(90deg, rgba(15, 84, 174, 0.00) 0%, rgba(15, 84, 174, 0.05) 0.54%, rgba(15, 84, 174, 0.05) 99.48%, rgba(15, 84, 174, 0.00) 100%);
      }

      &:hover::before {
        // background-image: linear-gradient(90deg, rgba(15, 84, 174, 0.00) 0%, rgba(15, 84, 174, 0.05) 0.54%, rgba(15, 84, 174, 0.05) 99.48%, rgba(15, 84, 174, 0.00) 100%);

        background-color: red;
        // background-color: var(--qas-background-color);

        // td {
        //   border-bottom: 1px solid var(--q-primary-contrast);;
        // }

      }

      td::before {
        // background-color: var(--qas-background-color);
        display: none;
      }
    }

    thead tr:hover {
      // background-color: white;
    }
  }

  &--mobile {
    margin: 0 -10px;

    .q-table {
      margin-left: 10px;
    }
  }

  &--sticky-header {
    .q-table thead tr {
      th {
        position: sticky;
        z-index: 1;
      }

      &:first-child {
        th {
          background-color: white;
          top: 0;
        }
      }
    }
  }
}
</style>
