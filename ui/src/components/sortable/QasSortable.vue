<template>
  <component :is="tag" ref="items" v-bind="$attrs" v-on="$listeners">
    <slot :sorted="sorted" />
  </component>
</template>

<script>
import { cloneDeep, get } from 'lodash'
import Sortable from 'sortablejs'

let sortable = null

export default {
  props: {
    results: {
      type: Array,
      default: () => []
    },

    tag: {
      type: String,
      default: 'div'
    },

    entity: {
      type: String,
      required: false
    },

    url: {
      type: String,
      default: ''
    },

    options: {
      type: Object,
      default: () => ({ animation: 500 })
    }
  },

  data () {
    return {
      sorted: null
    }
  },

  watch: {
    results (value) {
      this.updateValue(value)
      sortable.sort(sortable.toArray())
    },

    options (value) {
      sortable.options = { ...sortable.options, ...value }
    }
  },

  created () {
    this.updateValue()
  },

  mounted () {
    sortable = new Sortable(this.$refs.items, {
      ...this.options,

      onUpdate: event => {
        this.updateOrder(event)
        this.$emit('sort', event)
      }
    })
  },

  computed: {
    identifiers () {
      return this.sorted.map(({ id }) => id)
    }
  },

  methods: {
    updateOrder ({ oldIndex, newIndex }) {
      const deleted = this.sorted.splice(oldIndex, 1)
      this.sorted.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    updateValue (value) {
      this.sorted = cloneDeep(value || this.results)
    },

    async replace () {
      this.$q.loading.show()

      try {
        const response = await this.$store.dispatch(`${this.entity}/replace`, {
          payload: { order: this.identifiers },
          url: this.url || `${this.entity}/sort`
        })

        this.$emit('success', response)
      } catch (error) {
        this.handleError(error)
      } finally {
        this.$q.loading.hide()
      }
    },

    handleError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

      this.$qs.error('Ops! Erro ao ordernar itens.', exception)
    }
  },

  beforeDestroy () {
    sortable.destroy()
  }
}
</script>
