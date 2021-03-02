<template>
  <component :is="tag" ref="items" v-bind="$attrs" v-on="$listeners">
    <slot :sorted="sorted" />
  </component>
</template>

<script>
import { cloneDeep, get } from 'lodash'
import { Loading } from 'quasar'
import { NotifyError } from '../../plugins'
import Sortable from 'sortablejs'

let sortable = null

export default {
  props: {
    entity: {
      default: '',
      type: String
    },

    options: {
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

  data () {
    return {
      sorted: null
    }
  },

  computed: {
    identifiers () {
      return this.sorted.map(({ id }) => id)
    }
  },

  watch: {
    options (value) {
      sortable.options = { ...sortable.options, ...value }
    },

    results (value) {
      this.updateValue(value)
      sortable.sort(sortable.toArray())
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

  beforeDestroy () {
    sortable.destroy()
  },

  methods: {
    handleError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

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
        this.handleError(error)
      } finally {
        Loading.hide()
      }
    },

    updateOrder ({ oldIndex, newIndex }) {
      const deleted = this.sorted.splice(oldIndex, 1)
      this.sorted.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    updateValue (value) {
      this.sorted = cloneDeep(value || this.results)
    }
  }
}
</script>
