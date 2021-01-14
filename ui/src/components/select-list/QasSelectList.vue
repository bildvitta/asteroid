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

import QasSearchBox from '../search-box/QasSearchBox'
import QasBtn from '../btn/QasBtn'

export default {
  components: {
    QasSearchBox,
    QasBtn
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },

    options: {
      type: Array,
      default: () => []
    },

    deleteOnly: {
      type: Boolean
    },

    to: {
      type: Object,
      default: () => ({})
    },

    toIdentifier: {
      type: String,
      default: 'value'
    },

    fuseOptions: {
      type: Object,
      default: () => ({
        keys: ['label']
      })
    }
  },

  data () {
    return {
      sortedOptions: [],
      values: []
    }
  },

  computed: {
    self () {
      return this
    },

    isMobile () {
      return this.$q.screen.xs
    },

    isRedirectEnabled () {
      return Object.keys(this.to).length
    },

    labelClass () {
      return this.isRedirectEnabled ? 'cursor-pointer' : ''
    }
  },

  watch: {
    value (value) {
      this.values = [...value]
    },

    options: {
      handler (value) {
        if (!this.sortedOptions.length) {
          this.sortedOptions = value
        }
      },

      immediate: true
    }
  },

  created () {
    this.values = [...this.value]

    this.handleOptions()
  },

  methods: {
    setButtonProps ({ value }) {
      const isSelected = this.values.includes(value)

      return {
        label: isSelected ? 'Remover' : 'Adicionar',
        icon: !this.isMobile ? undefined : isSelected ? 'o_close' : 'o_add',
        dense: this.isMobile,
        outline: isSelected
      }
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

    sortOptions () {
      this.sortedOptions = this.deleteOnly
        ? this.options.filter(option => this.value.includes(option.value))
        : sortBy(this.options, option => !this.value.includes(option.value))
    },

    handleClick (item) {
      return this.values.includes(item.value) ? this.remove(item) : this.add(item)
    },

    add (item) {
      this.values.push(item.value)
      this.updateModel()
    },

    remove (item) {
      const index = this.values.findIndex(value => value === item.value)

      this.values.splice(index, 1)
      this.updateModel()
    },

    updateModel () {
      this.$emit('input', this.values)
    },

    redirectRoute (item) {
      return this.isRedirectEnabled && this.$router.push({
        params: { id: item[this.toIdentifier] },
        ...this.to
      })
    }
  }
}
</script>
