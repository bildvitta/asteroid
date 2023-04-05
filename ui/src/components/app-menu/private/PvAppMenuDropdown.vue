<template>
  <div class="pv-app-menu-dropdown">
    <qas-btn-dropdown v-bind="defaultButtonDropdownProps">
      <q-list>
        <q-item v-for="item in modules" :key="item" :active="isActive(item)" active-class="text-primary" :href="item.value">
          <q-item-section v-if="item.icon" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <div>{{ item.label }}</div>
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

    modules: {
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
    font-size: 1.125rem !important;
  }
}
</style>
