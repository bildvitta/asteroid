<template>
  <qas-search-box v-model:results="results" class="q-pa-md" :fuse-options="fuseOptions" :list="sortedList">
    <template #default>
      <q-list separator>
        <q-item v-for="result in results" :key="result.value">
          <slot name="item" v-bind="slotData">
            <slot name="item-section" :result="result">
              <q-item-section class="items-start text-bold">
                <div :class="labelClass" @click="redirectRoute(result)">{{ result.label }}</div>
              </q-item-section>
            </slot>

            <q-item-section avatar>
              <slot name="item-action" v-bind="slotData">
                <qas-btn v-bind="getButtonProps(result)" @click="handleClick(result)" />
              </slot>
            </q-item-section>
          </slot>
        </q-item>
      </q-list>
    </template>
  </qas-search-box>
</template>

<script>
import { sortBy } from 'lodash-es'
import { screenMixin } from '../../mixins'

import QasBtn from '../btn/QasBtn.vue'
import QasSearchBox from '../search-box/QasSearchBox.vue'

export default {
  name: 'QasSelectList',

  components: {
    QasBtn,
    QasSearchBox
  },

  mixins: [screenMixin],

  props: {
    deleteOnly: {
      type: Boolean
    },

    fuseOptions: {
      default: () => ({ keys: ['label'] }),
      type: Object
    },

    list: {
      default: () => [],
      type: Array
    },

    modelValue: {
      type: Array,
      default: () => []
    },

    to: {
      default: () => ({}),
      type: Object
    },

    redirectKey: {
      default: 'uuid',
      type: String
    },

    paramKey: {
      default: 'id',
      type: String
    }
  },

  emits: [
    'added',
    'update:modelValue',
    'removed'
  ],

  data () {
    return {
      sortedList: [],
      values: [],
      results: []
    }
  },

  computed: {
    isRedirectEnabled () {
      return Object.keys(this.to).length
    },

    labelClass () {
      return this.isRedirectEnabled ? 'cursor-pointer' : ''
    },

    slotData () {
      return {
        add: this.add,
        handleClick: this.handleClick,
        remove: this.remove,
        updateModel: this.updateModel
      }
    }
  },

  watch: {
    list: {
      handler (value) {
        if (!this.sortedList.length) {
          this.sortedList = value
        }
      },

      immediate: true
    },

    modelValue (value) {
      this.values = [...value]
    }
  },

  created () {
    this.values = [...this.modelValue]

    this.handleOptions()
  },

  methods: {
    add (item) {
      this.values.push(item.value)
      this.updateModel()

      this.$emit('added', item)
    },

    getButtonProps ({ value }) {
      const isSelected = this.values.includes(value)

      return {
        dense: this.mx_isSmall,
        hideLabelOnSmallScreen: true,
        icon: !this.mx_isSmall ? undefined : isSelected ? 'o_close' : 'o_add',
        label: isSelected ? 'Remover' : 'Adicionar',
        outline: isSelected,
        size: 'sm'
      }
    },

    handleClick (item) {
      return this.values.includes(item.value) ? this.remove(item) : this.add(item)
    },

    handleOptions () {
      if (this.modelValue.length) {
        return this.sortList()
      }

      const unwatch = this.$watch('modelValue', () => {
        if (!this.sortedList.length) {
          this.sortList()
          unwatch()
        }
      })
    },

    redirectRoute (item) {
      return this.isRedirectEnabled && this.$router.push({
        params: { [this.paramKey]: item[this.redirectKey] },
        ...this.to
      })
    },

    remove (item) {
      const index = this.values.findIndex(value => value === item.value)

      this.values.splice(index, 1)
      this.updateModel()

      this.$emit('removed', item, index)
    },

    sortList () {
      this.sortedList = this.deleteOnly
        ? this.list.filter(option => this.modelValue.includes(option.value))
        : sortBy(this.list, option => !this.modelValue.includes(option.value))
    },

    updateModel (model) {
      this.$emit('update:modelValue', model || this.values)
    }
  }
}
</script>
