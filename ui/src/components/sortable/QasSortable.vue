<template>
  <component :is="tag" ref="sortableItems">
    <slot />
  </component>
</template>

<script>
import { Loading, extend } from 'quasar'
import Sortable from 'sortablejs'

import { NotifyError } from '../../plugins'

export default {
  name: 'QasSortable',

  props: {
    entity: {
      default: '',
      required: true,
      type: String
    },

    sortableOptions: {
      default: () => ({ animation: 500 }),
      type: Object
    },

    list: {
      default: () => [],
      type: Array
    },

    tag: {
      default: 'div',
      type: String
    },

    url: {
      default: '',
      type: String
    },

    sorted: {
      default: () => [],
      type: Array
    }
  },

  emits: [
    'update:sorted',
    'sort',
    'success',
    'error'
  ],

  data () {
    return {
      sortable: null,
      sortedList: null
    }
  },

  computed: {
    identifiers () {
      return this.sortedList.map(({ id }) => id)
    }
  },

  watch: {
    sortableOptions (value) {
      this.sortable.options = { ...this.sortable.options, ...value }
    },

    list (value) {
      this.setSortedValue(value)
      this.sortable.sort(this.sortable.toArray())
    }
  },

  created () {
    this.setSortedValue()
  },

  async mounted () {
    this.sortable = new Sortable(this.$refs.sortableItems, {
      ...this.sortableOptions,

      onUpdate: event => {
        this.updateOrder(event)
        this.$emit('sort', event)
      }
    })
  },

  unmounted () {
    this.sortable.destroy()
  },

  methods: {
    setError (error) {
      const { response } = error
      const exception = response?.data?.exception || error.message

      NotifyError('Ops! Erro ao salvar ordenação.', exception)
    },

    // TODO precisa testar este método quando tivermos uma API para teste.
    async replace () {
      Loading.show()

      try {
        const response = await this.$store.dispatch(`${this.entity}/replace`, {
          payload: { order: this.identifiers },
          url: this.url || `${this.entity}/sort`
        })

        this.$emit('success', response)
      } catch (error) {
        this.setError(error)
        this.$emit('error', error)
      } finally {
        Loading.hide()
      }
    },

    updateOrder ({ newIndex, oldIndex }) {
      const deleted = this.sortedList.splice(oldIndex, 1)
      this.sortedList.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    setSortedValue (value) {
      this.sortedList = extend(true, [], value || this.list)
      this.updateSortedModel()
    },

    updateSortedModel () {
      return this.$emit('update:sorted', this.sortedList)
    }
  }
}
</script>
