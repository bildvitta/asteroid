<template>
  <q-tabs v-model="currentTab" v-bind="$attrs" v-on="$listeners">
    <slot v-for="(tab, key) in formattedTabs" :name="`tab-${tab.label}`" :item="tab">
      <q-tab :name="key" :label="tab.label" :key="key" v-bind="tab">
        <slot :name="`tab-slot-${tab.label}`" :item="tab">
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
