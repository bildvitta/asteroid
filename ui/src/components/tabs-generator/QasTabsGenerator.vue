<template>
  <q-tabs v-model="model" :active-color="activeColor" :indicator-color="indicatorColor" outside-arrows>
    <slot v-for="(tab, key) in formattedTabs" :item="tab" :name="`tab-${tab.value}`">
      <q-tab :key="key" v-bind="tab" :class="tabClass" :label="tab.label" :name="key">
        <slot :item="tab" :name="`tab-after-${tab.value}`">
          <q-badge v-if="counters[key]" :label="counters[key]" v-bind="defaultCounterProps" />
        </slot>
      </q-tab>
    </slot>
  </q-tabs>
</template>

<script>
import { extend } from 'quasar'

export default {
  name: 'QasTabsGenerator',

  props: {
    activeColor: {
      default: 'primary',
      type: String
    },

    counterProps: {
      default: () => ({}),
      type: Object
    },

    counters: {
      default: () => ({}),
      type: Object
    },

    indicatorColor: {
      default: 'primary',
      type: String
    },

    modelValue: {
      default: '',
      type: String
    },

    tabClass: {
      default: 'text-primary',
      type: String
    },

    tabs: {
      default: () => ({}),
      required: true,
      type: Object
    }
  },

  emits: ['update:modelValue'],

  computed: {
    defaultCounterProps () {
      return {
        color: 'negative',
        floating: true,
        ...this.counterProps
      }
    },

    formattedTabs () {
      const tabs = extend(true, {}, this.tabs)

      for (const key in tabs) {
        if (typeof tabs[key] === 'string') {
          tabs[key] = { label: tabs[key] }
        }
      }

      return tabs
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
