<template>
  <qas-search-box v-bind="$attrs" class="q-pa-md" :fuse-options="fuseOptions" :list="sortedOptions">
    <template #default="{ results }">
      <q-list separator>
        <q-item v-for="(result, index) in results" :key="index">
          <slot name="item" v-bind="self">
            <slot name="item-section" :result="result">
              <q-item-section class="items-start text-bold">
                <div :class="labelClass" @click="redirectRoute(result)">{{ result.label }}</div>
              </q-item-section>
            </slot>

            <q-item-section avatar>
              <slot name="item-action" v-bind="self">
                <qas-btn hide-mobile-label v-bind="setButtonProps(result)" size="sm" @click="handleClick(result)" />
              </slot>
            </q-item-section>
          </slot>
        </q-item>
      </q-list>
    </template>
  </qas-search-box>
</template>

<script>
import { sortBy } from 'lodash'

import QasBtn from '../btn/QasBtn'
import QasSearchBox from '../search-box/QasSearchBox'

export default {
  components: {
    QasBtn,
    QasSearchBox
  },

  props: {
    deleteOnly: {
      type: Boolean
    },

    fuseOptions: {
      default: () => ({ keys: ['label'] }),
      type: Object
    },

    options: {
      default: () => [],
      type: Array
    },

    to: {
      default: () => ({}),
      type: Object
    },

    toIdentifier: {
      type: String,
      default: 'value'
    },

    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      sortedOptions: [],
      values: []
    }
  },

  computed: {
    // TODO: parar de usar "mobile".
    isMobile () {
      return this.$q.screen.xs
    },

    isRedirectEnabled () {
      return Object.keys(this.to).length
    },

    labelClass () {
      return this.isRedirectEnabled ? 'cursor-pointer' : ''
    },

    self () {
      return this
    }
  },

  watch: {
    options: {
      handler (value) {
        if (!this.sortedOptions.length) {
          this.sortedOptions = value
        }
      },

      immediate: true
    },

    value (value) {
      this.values = [...value]
    }
  },

  created () {
    this.values = [...this.value]

    this.handleOptions()
  },

  methods: {
    add (item) {
      this.values.push(item.value)
      this.updateModel()
      this.$emit('added', item)
    },

    handleClick (item) {
      return this.values.includes(item.value) ? this.remove(item) : this.add(item)
    },

    handleOptions () {
      if (this.value.length) {
        return this.sortOptions()
      }

      const unwatch = this.$watch('value', value => {
        if (!this.sortedOptions.length) {
          this.sortOptions()
          unwatch()
        }
      })
    },

    redirectRoute (item) {
      return this.isRedirectEnabled && this.$router.push({
        params: { id: item[this.toIdentifier] },
        ...this.to
      })
    },

    remove (item) {
      const index = this.values.findIndex(value => value === item.value)

      this.values.splice(index, 1)
      this.updateModel()

      this.$emit('removed', item, index)
    },

    setButtonProps ({ value }) {
      const isSelected = this.values.includes(value)

      return {
        dense: this.isMobile,
        icon: !this.isMobile ? undefined : isSelected ? 'o_close' : 'o_add',
        label: isSelected ? 'Remover' : 'Adicionar',
        outline: isSelected
      }
    },

    sortOptions () {
      this.sortedOptions = this.deleteOnly
        ? this.options.filter(option => this.value.includes(option.value))
        : sortBy(this.options, option => !this.value.includes(option.value))
    },

    updateModel () {
      this.$emit('input', this.values)
    }
  }
}
</script>
