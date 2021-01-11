<template>
  <q-tabs v-model="currentTab" v-bind="$attrs" v-on="$listeners">
    <slot v-for="(tab, key) in formattedTabs" :item="tab" :name="`tab-${tab.label}`">
      <q-tab :key="key" :label="tab.label" :name="key" v-bind="tab">
        <slot :item="tab" :name="`tab-slot-${tab.label}`">
          <q-badge v-if="counters[key]" color="negative" floating :label="counters[key]" />
        </slot>
      </q-tab>
    </slot>
  </q-tabs>
</template>

<script>
import { extend } from 'quasar'

export default {
  props: {
    tabs: {
      default: () => ({}),
      type: Object,
      required: true
    },

    counters: {
      default: () => ({}),
      type: Object
    },

    value: {
      default: '',
      type: String
    }
  },

  computed: {
    currentTab: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
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
    }
  }
}
</script>
