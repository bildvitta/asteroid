<template>
  <div class="row transfer" :class="gutterClass">
    <div class="col-12 col-sm">
      <qas-label :label="label" :quantity="optionsList.length" />

      <qas-search-box form-mode :list="optionsList" v-bind="searchBoxProps">
        <template #default="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" :class="itemClass(item, true)" clickable @click="onSelectQueue(item, true)">
              <slot name="item-first-column">
                <q-item-section>{{ item[labelKey] }}</q-item-section>
              </slot>
            </q-item>
          </q-list>
        </template>
      </qas-search-box>
    </div>

    <div class="col-12 col-sm-auto items-center justify-center q-col-gutter-md row" :class="actionsClass">
      <div>
        <div>
          <qas-btn :class="iconClass" dense :disabled="!firstQueue.length" flat icon="o_arrow_circle_down" rounded @click="setSelectedFromClick(true)" />
          <q-tooltip anchor="top middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
      <div>
        <div>
          <qas-btn :class="iconClass" dense :disabled="!secondQueue.length" flat icon="o_arrow_circle_up" rounded @click="setSelectedFromClick()" />
          <q-tooltip anchor="bottom middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm">
      <qas-label label="Selecionadas" :quantity="selectedList.length" />

      <qas-search-box v-bind="searchBoxProps" empty-list-height="300px" form-mode label="Selecionadas" :list="selectedList" :quantity="selectedList.length">
        <template #default="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" :class="itemClass(item)" clickable @click="onSelectQueue(item)">
              <slot name="item-second-column">
                <q-item-section>{{ item[labelKey] }}</q-item-section>
              </slot>
            </q-item>
          </q-list>
        </template>
      </qas-search-box>
    </div>
  </div>
</template>

<script>
import { extend } from 'quasar'

import QasLabel from '../label/QasLabel'
import QasSearchBox from '../search-box/QasSearchBox'
import QasBtn from '../btn/QasBtn'

export default {
  components: {
    QasLabel,
    QasSearchBox,
    QasBtn
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },

    emitValue: {
      type: Boolean
    },

    fuseOptions: {
      type: Object,
      default: () => ({ keys: ['label'] })
    },

    hideEmptySlot: {
      type: Boolean,
      default: true
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    options: {
      type: Array,
      default: () => []
    },

    label: {
      type: String,
      required: true,
      default: ''
    }
  },

  data () {
    return {
      firstQueue: [],
      secondQueue: [],
      selectedList: [],
      optionsList: []
    }
  },

  computed: {
    isSmall () {
      return this.$q.screen.xs
    },

    iconClass () {
      return !this.isSmall && 'transfer__icon'
    },

    actionsClass () {
      return !this.isSmall && 'column'
    },

    searchBoxProps () {
      return {
        list: this.options,
        fuseOptions: this.fuseOptions,
        hideEmptySlot: this.hideEmptySlot
      }
    },

    isMedium () {
      return this.$q.screen.lt.md
    },

    gutterClass () {
      return `q-col-gutter-${this.isMedium ? 'md' : 'xl'}`
    }
  },

  watch: {
    options: {
      handler (value) {
        this.optionsList = extend(true, [], value)
      },

      immediate: true
    },

    value: {
      handler (value, oldValue) {
        this.setSelectedFromValue(true)
      },

      immediate: true
    }
  },

  methods: {
    onSelectQueue (item, isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'
      const index = this[model].findIndex(selected => selected[this.valueKey] === item[this.valueKey])

      return ~index ? this[model].splice(index, 1) : this[model].push(item)
    },

    setSelectedFromValue (isFirst) {
      this.value.forEach(item => {
        const selected = this.optionsList.find(option => {
          return option[this.valueKey] === (this.emitValue ? item : item[this.valueKey])
        })

        if (selected) {
          this.firstQueue.push(extend(true, {}, selected))
        }
      })

      this.handleSelectedList(isFirst)
    },

    setSelectedFromClick (isFirst) {
      this.handleSelectedList(isFirst)
      this.updateValue()
    },

    itemClass (object, isFirst) {
      return this[isFirst
        ? 'firstQueue'
        : 'secondQueue'
      ].some(item => item[this.valueKey] === object[this.valueKey]) && 'bg-secondary'
    },

    handleSelectedList (isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'

      this[isFirst ? 'selectedList' : 'optionsList'].push(...this[model])

      this.deleteItemsFromList(isFirst)

      this[model] = []
    },

    handleEmit () {
      const selectedList = extend(true, [], this.selectedList)

      return this.emitValue ? selectedList.map(item => item[this.valueKey]) : selectedList
    },

    updateValue () {
      return this.$emit('input', this.handleEmit())
    },

    deleteItemsFromList (isFirst) {
      this[isFirst ? 'firstQueue' : 'secondQueue'].forEach(item => {
        const model = isFirst ? 'optionsList' : 'selectedList'
        const index = this[model].findIndex(itemValue => {
          return (itemValue[this.valueKey] || itemValue) === item[this.valueKey]
        })

        if (~index) {
          this[model].splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.transfer {
  &__icon {
    transform: rotate(-90deg);
  }
}
</style>
