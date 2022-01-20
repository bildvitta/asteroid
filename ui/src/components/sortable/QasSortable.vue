<template>
  <component :is="tag" ref="sortableItems">
    <slot :sorted="sorted" />
  </component>
</template>

<script>
import { Loading, extend } from 'quasar'
import { NotifyError } from '../../plugins'

export default {
  props: {
    entity: {
      default: '',
      type: String
    },

    sortableOptions: {
      default: () => ({ animation: 500 }),
      type: Object
    },

    results: {
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
    }
  },

  emits: ['sort', 'success'],

  data () {
    return {
      sortable: null,
      sorted: null
    }
  },

  computed: {
    identifiers () {
      return this.sorted.map(({ id }) => id)
    }
  },

  watch: {
    sortableOptions (value) {
      this.sortable.options = { ...this.sortable.options, ...value }
    },

    results (value) {
      this.setSortedValue(value)
      this.sortable.sort(this.sortable.toArray())
    }
  },

  created () {
    this.setSortedValue()
  },

  async mounted () {
    const Sortable = (await import('sortablejs')).default

    this.sortable = new Sortable(this.$refs.sortableItems, {
      ...this.sortableOptions,

      onUpdate: event => {
        this.updateOrder(event)
        this.$emit('sort', event)
      }
    })

    console.log(this.sortable)
  },

  unmounted () {
    this.sortable.destroy()
  },

  methods: {
    setError (error) {
      const { response } = error
      const exception = response?.data?.exception || error.message

      NotifyError('Ops! Erro ao ordernar itens.', exception)
    },

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
      } finally {
        Loading.hide()
      }
    },

    updateOrder ({ newIndex, oldIndex }) {
      const deleted = this.sorted.splice(oldIndex, 1)
      this.sorted.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    setSortedValue (value) {
      this.sorted = extend(true, [], value || this.results)
    }
  }
}
</script>
