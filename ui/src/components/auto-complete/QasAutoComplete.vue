<template>
  <q-select v-model="selectModel" v-bind="$attrs" clearable emit-value :fill-input="hasNoCustomValue" :hide-selected="hasNoCustomValue" map-options :options="filteredOptions" outlined use-input v-on="$listeners" @filter="filterOptions">
    <template v-for="(slot, key) in $scopedSlots" #[key]="context">
      <slot :name="key" v-bind="context" />
    </template>

    <template v-for="(slot, key) in $slots" #[key]="context">
      <slot :name="key" v-bind="context" />
    </template>

    <template #append>
      <slot name="append">
        <q-icon name="o_search" />
      </slot>
    </template>

    <template #no-option>
      <slot name="no-option">
        <q-item>
          <q-item-section class="text-grey">
            {{ noOptionLabel }}
          </q-item-section>
        </q-item>
      </slot>
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
      type: [Array, Object, String, Number]
    },

    valueKey: {
      default: '',
      type: String
    },

    noOptionLabel: {
      default: 'Nenhum resultado foi encontrado.',
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

    multiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasSelectedSlot () {
      return !!(this.$slots['selected-item'] || this.$scopedSlots['selected-item'])
    },

    hasNoCustomValue () {
      return !this.multiple && !this.hasSelectedSlot
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
