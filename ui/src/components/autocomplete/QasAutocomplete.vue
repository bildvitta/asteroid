<template>
  <q-select v-model="selectModel" v-bind="$attrs" clearable emit-value :fill-input="!multiple" :hide-selected="!multiple" map-options :options="filteredOptions" outlined use-input v-on="$listeners" @filter="filterOptions">
    <template #append>
      <q-icon name="o_search" />
    </template>

    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum resultado foi encontrado.
        </q-item-section>
      </q-item>
    </template>

    <template v-if="hasOptionSlot" #option="scope">
      <slot name="option" :scope="scope" />
    </template>
  </q-select>
</template>

<script>
import Fuse from 'fuse.js'
let fuse = null

export default {
  props: {
    labelKey: {
      type: String,
      default: ''
    },

    valueKey: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Object, Array],
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    },

    fuseOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      valueOption: '',
      filteredOptions: [],
      results: [],
      search: '',
      selectModel: null
    }
  },

  computed: {
    hasResult () {
      return this.results.length
    },

    multiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasOptionSlot () {
      return !!(this.$slots.option || this.$scopedSlots.option)
    },

    formattedResult () {
      if (!this.labelKey && !this.valueKey) {
        console.log(this.options)
        return this.options
      }
      return this.options.map(item => this.renameKey(item))
    },

    defaultFuseOptions () {
      return {
        distance: 100,
        keys: ['label', 'value'],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,
        ...this.fuseOptions
      }
    }
  },

  watch: {
    search (value) {
      this.filter(value)
    },

    defaultFuseOptions (value) {
      fuse.options = { ...fuse.options, ...value }
    },

    options (value) {
      if (!this.filteredOptions.length) {
        this.filteredOptions = value
      }

      fuse.list = value
    },

    value (value) {
      this.$emit('input', value)
    }
  },

  created () {
    if (this.value) {
      this.selectModel = this.multiple ? [this.value] : this.value
    }

    fuse = new Fuse(this.options, this.defaultFuseOptions)
  },

  methods: {
    renameKey (item) {
      const mapKeys = { label: this.labelKey, value: this.valueKey }

      for (const newKey in mapKeys) {
        if (!item.hasOwnProperty.call(newKey)) {
          item[newKey] = item[mapKeys[newKey]]
          delete item[mapKeys[newKey]]
        }
      }

      return item
    },

    filterOptions (value, update) {
      update(() => {
        if (value === '') {
          this.filteredOptions = this.formattedResult
        } else {
          console.log(value)
          this.filteredOptions = fuse.search(value)
        }
      })
    }
  }
}
</script>
