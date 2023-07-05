<template>
  <qas-search-box v-model:results="results" v-bind="defaultSearchBoxProps" :list="sortedList">
    <template #default>
      <q-list separator>
        <q-item v-for="result in results" :key="result.value" class="q-px-none">
          <slot v-bind="slotData" :item="result" name="item">
            <slot name="item-section" :result="result">
              <q-item-section>
                <div :class="labelClass" @click="onClickLabel({ item: result, index })">
                  {{ result.label }}
                </div>
              </q-item-section>
            </slot>

            <q-item-section avatar>
              <slot :item="result" name="item-action" v-bind="slotData">
                <qas-btn :disable="readonly" :use-label-on-small-screen="false" v-bind="getButtonProps(result)" @click="handleClick(result)" />
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

import QasBtn from '../btn/QasBtn.vue'
import QasSearchBox from '../search-box/QasSearchBox.vue'

export default {
  name: 'QasSelectList',

  components: {
    QasBtn,
    QasSearchBox
  },

  inheritAttrs: false,

  props: {
    addLabel: {
      type: String,
      default: 'Adicionar'
    },

    deleteLabel: {
      type: String,
      default: 'Excluir'
    },

    deleteOnly: {
      type: Boolean
    },

    emitValue: {
      type: Boolean,
      default: true
    },

    modelValue: {
      type: Array,
      default: () => []
    },

    readonly: {
      type: Boolean
    },

    searchBoxProps: {
      type: Object,
      default: () => ({})
    },

    useClickableLabel: {
      type: Boolean
    },

    useEmitLabelValueOnly: {
      type: Boolean,
      default: true
    }
  },

  emits: [
    'added',
    'click-label',
    'removed',
    'update:modelValue'
  ],

  data () {
    return {
      sortedList: [],
      values: [],
      results: []
    }
  },

  computed: {
    defaultSearchBoxProps () {
      return {
        fuseOptions: { keys: ['label'] },

        ...this.searchBoxProps
      }
    },

    hasLazyLoading () {
      return this.defaultSearchBoxProps.useLazyLoading
    },

    labelClass () {
      return this.useClickableLabel && 'cursor-pointer'
    },

    list () {
      return this.defaultSearchBoxProps.list || []
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
        if (!this.hasLazyLoading) return this.sortList()

        this.sortedList = [...value]
      },

      immediate: true
    },

    modelValue: {
      handler (value) {
        this.values = [...value]
      },

      deep: true,
      immediate: true
    }
  },

  created () {
    if (!this.hasLazyLoading) this.handleList()
  },

  methods: {
    add (item) {
      this.values.push(this.getNormalizedValue(item))
      this.updateModel()

      this.$emit('added', item)
    },

    getButtonProps ({ value }) {
      const isSelected = this.hasValueInModel(value)

      return {
        label: isSelected ? this.deleteLabel : this.addLabel,
        variant: 'tertiary',
        color: isSelected ? 'grey-9' : 'primary',
        icon: isSelected ? 'sym_r_delete' : 'sym_r_add'
      }
    },

    handleClick (item) {
      return this.hasValueInModel(item.value) ? this.remove(item) : this.add(item)
    },

    handleList () {
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

    onClickLabel ({ item, index }) {
      this.useClickableLabel && this.$emit('click-label', { item, index })
    },

    remove (item) {
      const index = this.values.findIndex(itemValue => {
        return this.emitValue ? itemValue === item.value : itemValue.value === item.value
      })

      this.values.splice(index, 1)
      this.updateModel()

      this.$emit('removed', item, index)
    },

    sortList () {
      this.sortedList = this.deleteOnly
        ? this.list.filter(item => this.hasValueInModel(item.value))
        : sortBy(this.list, item => !this.hasValueInModel(item.value))
    },

    updateModel (model) {
      this.$emit('update:modelValue', model || this.values)
    },

    hasValueInModel (value) {
      return this.emitValue
        ? this.modelValue.includes(value)
        : !!this.modelValue.find(item => item.value === value)
    },

    getNormalizedValue (objectValue = {}) {
      if (this.emitValue) return objectValue.value

      if (this.useEmitLabelValueOnly) {
        const { label, value } = objectValue

        return {
          label,
          value
        }
      }

      return objectValue
    }
  }
}
</script>
