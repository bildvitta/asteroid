<template>
  <q-select v-model="selectModel" v-bind="$attrs" clearable emit-value map-options :options="filteredOptions" outlined :use-input="searchable" v-on="$listeners" @filter="filterOptions">
    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />

    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>

    <template #append>
      <slot name="append">
        <q-icon v-if="searchable" name="o_search" />
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
    },

    searchable: {
      type: Boolean
    }
  },

  data () {
    return {
      filteredOptions: [],
      fuse: null,
      selectModel: null
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

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    value: {
      handler (value) {
        this.$emit('input', value)
      },
      immediate: true
    },

    options: {
      handler (value) {
        if (!this.filteredOptions.length) {
          this.filteredOptions = value
        }

        if (!this.fuse) return

        this.fuse.list = value
      },
      immediate: true
    }
  },

  created () {
    if (this.value) {
      this.selectModel = this.value
    }

    if (this.searchable) {
      this.fuse = new Fuse(this.options, this.defaultFuseOptions)
    }
  },

  methods: {
    filterOptions (value, update) {
      update(() => {
        if (!this.searchable) return

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
