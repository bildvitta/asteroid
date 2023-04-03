<template>
  <div class="pv-app-menu-dropdown">
    <qas-btn-dropdown v-bind="defaultButtonDropdownProps">
      <q-list>
        <q-item v-for="moduleItem in options" :key="moduleItem" :active="isActive(moduleItem)" active-class="text-primary" :to="moduleItem.value">
          <q-item-section v-if="moduleItem.icon" avatar>
            <q-icon :name="moduleItem.icon" />
          </q-item-section>

          <q-item-section>
            <div>{{ moduleItem.label }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </qas-btn-dropdown>
  </div>
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
          align: 'between',
          class: 'text-subtitle2',
          color: 'primary',
          iconRight: 'sym_r_expand_more',
          label: this.currentModule.label,
          useEllipsis: true,
          useLabelOnSmallScreen: true
        }
      }
    }
  },

  methods: {
    isActive ({ value }) {
      const { host, protocol } = window.location
      const url = `${protocol}//${host}`

      return url.includes(value)
    }
  }
}
</script>

<style lang="scss">
.pv-app-menu-dropdown {
  .qas-btn .q-icon {
    font-size: 18px !important;
  }
}
</style>
