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

export default {
  props: {
    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    labelKey: {
      default: '',
      type: String
    },

    options: {
      default: () => [],
      type: Array
    },

    value: {
      default: '',
      type: [Array, Object, String]
    },

    valueKey: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      filteredOptions: [],
      fuse: null,
      search: '',
      selectModel: null,
      valueOption: ''
    }
  },

  computed: {
    defaultFuseOptions () {
      return {
        distance: 100,
        includeScore: true,
        keys: ['label', 'value'],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,

        ...this.fuseOptions
      }
    },

    formattedResult () {
      if (!this.labelKey && !this.valueKey) {
        return this.options
      }

      return this.options.map(item => this.renameKey(item))
    },

    hasOptionSlot () {
      return !!(this.$slots.option || this.$scopedSlots.option)
    },

    multiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    options (value) {
      if (!this.filteredOptions.length) {
        this.filteredOptions = value
      }

      this.fuse.list = value
    },

    search (value) {
      this.filter(value)
    },

    value (value) {
      this.$emit('input', value)
    }
  },

  created () {
    if (this.value) {
      this.selectModel = this.multiple ? [this.value] : this.value
    }

    this.fuse = new Fuse(this.options, this.defaultFuseOptions)
  },

  methods: {
    filterOptions (value, update) {
      update(() => {
        if (value === '') {
          this.filteredOptions = this.formattedResult
        } else {
          const results = this.fuse.search(value)
          this.filteredOptions = results.map(item => item.item)
        }
      })
    },

    renameKey (item) {
      const mapKeys = { label: this.labelKey, value: this.valueKey }

      for (const newKey in mapKeys) {
        if (!item.hasOwnProperty.call(newKey)) {
          item[newKey] = item[mapKeys[newKey]]
          delete item[mapKeys[newKey]]
        }
      }

      return item
    }
  }
}
</script>
