<template>
  <q-tabs v-model="currentTab" v-bind="$attrs" :active-color="activeColor" :class="bgColorClass" :indicator-color="indicatorColor" outside-arrows v-on="$listeners">
    <slot v-for="(tab, key) in formattedTabs" :item="tab" :name="`tab-${tab.value}`">
      <q-tab :key="key" v-bind="tab" :class="colorClass" :label="tab.label" :name="key">
        <slot :item="tab" :name="`tab-after-${tab.value}`">
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
    activeColor: {
      default: 'primary',
      type: String
    },

    bgColorClass: {
      default: 'transparent',
      type: String
    },

    colorClass: {
      default: 'text-primary',
      type: String
    },

    counters: {
      default: () => ({}),
      type: Object
    },

    indicatorColor: {
      default: 'primary',
      type: String
    },

    tabs: {
      default: () => ({}),
      type: Object,
      required: true
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
