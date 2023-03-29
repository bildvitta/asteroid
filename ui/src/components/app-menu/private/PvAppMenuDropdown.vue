<template>
  <qas-btn-dropdown v-bind="defaultButtonDropdownProps">
    <q-list>
      <q-item v-for="moduleItem in options" :key="moduleItem">
        {{ moduleItem.label }}
      </q-item>
    </q-list>
  </qas-btn-dropdown>
</template>

<script>
export default {
  name: 'PvAppMenuDropdown',

  props: {
    buttonDropdownProps: {
      type: Object,
      default: () => ({})
    },

    currentModule: {
      type: Object,
      default: () => ({})
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    defaultButtonDropdownProps () {
      return {
        ...this.buttonDropdownProps,
        buttonProps: {
          label: this.currentModule.label
        }
      }
    }
  }
}
</script>
