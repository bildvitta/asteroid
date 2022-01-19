<template>
  <q-table class="bg-transparent qas-table" :class="tableClasses" v-bind="attributes">
    <template v-for="(slot, key) in $scopedSlots" #[key]="context">
      <slot v-if="hasBodySlot" name="body" :props="context" />

      <q-td v-else :key="key">
        <slot :name="key" v-bind="context" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { extend } from 'quasar'
import { humanize } from '../../helpers/filters'
import screen from '../../mixins/screen'
import generatorMixin from '../../mixins/generator'

export default {
  mixins: [screen, generatorMixin],

  props: {
    columns: {
      default: () => [],
      type: Array
    },

    fields: {
      default: () => ({}),
      type: [Array, Object]
    },

    order: {
      default: () => [],
      type: Array
    },

    results: {
      default: () => [],
      required: true,
      type: Array
    },

    rowKey: {
      default: 'name',
      type: String
    }
  },

  computed: {
    attributes () {
      const attributes = {
        columns: this.columnsByFields,
        data: this.resultsByFields,
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

    hasBodySlot () {
      return !!(this.$slots.body || this.$scopedSlots.body)
    },

    hasFields () {
      return Object.keys(this.fields).length
    },

    resultsByFields () {
      const results = extend(true, [], this.results)

      return results.map((result, index) => {
        for (const key in result) {
          result.default = this.results[index]
          result[key] = humanize(this.fields[key], result[key]) || this.emptyResultText
        }

        return result
      })
    },

    rowsPerPage () {
      return this.results.length
    },

    tableClasses () {
      return this.$_isSmall && 'qas-table--mobile'
    }
  }
}
</script>

<style lang="scss">
.qas-table {
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
