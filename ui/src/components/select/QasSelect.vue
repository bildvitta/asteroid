<template>
  <q-select v-model="model" v-bind="attributes" @filter="filterOptions">
    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />

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

    modelValue: {
      default: () => [],
      type: [Array, Object, String, Number]
    },

    noOptionLabel: {
      default: 'Nenhum resultado foi encontrado.',
      type: String
    },

    options: {
      default: () => [],
      type: Array
    },

    searchable: {
      type: Boolean
    },

    valueKey: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      filteredOptions: [],
      fuse: null
    }
  },

  computed: {
    attributes () {
      return {
        clearable: this.searchable,
        emitValue: true,
        mapOptions: true,
        outlined: true,

        ...this.$attrs,

        options: this.filteredOptions,
        useInput: this.searchable
      }
    },

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

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    options: {
      handler () {
        if (this.fuse) {
          this.fuse.list = this.formattedResult
        }

        this.filteredOptions = this.formattedResult
      },

      immediate: true
    }
  },

  async created () {
    if (this.searchable) {
      const Fuse = (await import('fuse.js')).default
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
      const mapKeys = {
        label: this.labelKey,
        value: this.valueKey
      }

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
